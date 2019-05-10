import Component from '../../../views/Component.js';

import Error404 from '../../../views/pages/Error404.js';

import Tasks from '../../../models/Tasks.js';

class InfoAndEdit extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    render() {
        return new Promise(resolve => {
            let html;
	
			this.model.getTask(this.request.id).then(task => {
				this.task = task;
				
				if (this.task) {
					const {id, title, description, status} = this.task,
						statusDone = status === 'Done';
					
					if (!this.request.action) {
						html = `
							<h1 class="page-title">Task Info</h1>
							
							<div class="task-info">
								<p>
									<b>Task Title:</b>
									${title}
								</p>
								<p>
									<b>Task Description:</b>
									${description}
								</p>
								<p>
									<b>Task Status:</b>
									${status}
								</p>
								
								<div class="task-info__buttons">
									${!statusDone ?
							`<a class="task-info__btn-edit button" href="#/task/${id}/edit">Edit Task</a>`
							: ''}
									<a class="task-info__btn-back button" href="#/tasks">Back to List</a>
								</div>
							</div>
						`;
					} else {
						if (!statusDone) {
							html = `
								<h1 class="page-title">Task Edit</h1>
								
								<div class="task-edit">
									<p>
										<b>Task Title:</b>
										<input class="task-edit__title" type="text" value="${title}">
									</p>
									<p>
										<b>Task Description:</b>
										<textarea class="task-edit__description">${description}</textarea>
									</p>
							
									<div class="task-edit__buttons">
										<button class="task-edit__btn-save button">Save Task</button>
										<a class="task-edit__btn-back button" href="#/task/${id}">Back to Info</a>
									</div>
								</div>
							`;
						} else {
							html = new Error404().render();
						}
					}
				} else {
					html = new Error404().render();
				}
				
				resolve(html);
			});
        });
    }

    afterRender() {
        this.task && this.request.action && this.task.status !== 'Done' && this.setActions();
    }

    setActions() {
        const editTaskTitle = document.getElementsByClassName('task-edit__title')[0],
			editTaskDescription = document.getElementsByClassName('task-edit__description')[0],
			saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0];
	
		editTaskTitle.addEventListener('keyup', () => saveTaskBtn.disabled = !editTaskTitle.value.trim());
        saveTaskBtn.addEventListener('click', () => this.editTask(editTaskTitle, editTaskDescription));
    }

    editTask(editTaskTitle, editTaskDescription) {
        this.task.title = editTaskTitle.value.trim();
        this.task.description = editTaskDescription.value.trim();
	
		this.model.editTask(this.task).then(() => this.redirectToTaskInfo());
    }

    redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default InfoAndEdit;