const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dataFile = 'tasks.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/tasks', (req, res) => {
	res.send(fs.readFileSync(dataFile, 'utf8'));
});

app.post('/api/tasks', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')),
		task = req.body;
	
	task.id = shortId.generate();
	task.description = task.description || 'No Description';
	task.status = 'In Progress';
	
	data.push(task);
	fs.writeFileSync(dataFile, JSON.stringify(data));
	
	res.send(task);
});


app.get('/api/tasks/:id', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')),
		task = data.find(task => task.id === req.params.id);
	
	res.send(task);
});

app.put('/api/tasks/:id', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')),
		task = data.find(task => task.id === req.params.id),
		updatedTask = req.body;
	
	task.title = updatedTask.title;
	task.description = updatedTask.description || 'No Description';
	
	fs.writeFileSync(dataFile, JSON.stringify(data));
	
	res.sendStatus(204);
});

app.put('/api/tasks/:id/done', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
	
	data.find(task => task.id === req.params.id).status = 'Done';
	
	fs.writeFileSync(dataFile, JSON.stringify(data));
	
	res.sendStatus(204);
});

app.delete('/api/tasks/:id', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

	const updatedData = data.filter(task => task.id !== req.params.id);

	fs.writeFileSync(dataFile, JSON.stringify(updatedData));

	res.sendStatus(204);
});

app.delete('/api/tasks', (req, res) => {
    fs.writeFileSync(dataFile, JSON.stringify([]));
    
    res.sendStatus(204);
});

app.listen(3000, () =>  console.log('Server has been started...'));