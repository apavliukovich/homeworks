var startButton = document.getElementById('start'),
    clock = document.getElementById('clock'),
    body = document.getElementsByTagName('body')[0],
    flag = 0,
    time = 0;
var ms, sec, min, timerId;

startButton.addEventListener('click', start);

function start() {
    var savePointButton = document.createElement('button');
    savePointButton.textContent = 'Сохранить отметку';
    savePointButton.id = 'savePointButton';
    clock.appendChild(savePointButton);

    var resetButton = document.createElement('button');
    resetButton.textContent = 'Сбросить';
    resetButton.id = 'resetButton';
    clock.appendChild(resetButton);

    switch (this.textContent) {
        case 'Запустить':
            flag = 1;
            this.textContent = 'Приостановить';
            clockRun();
            break;

        case 'Приостановить':
            flag = 0;
            this.textContent = 'Возобновить';
            clock.removeChild(savePointButton);
            clock.removeChild(resetButton);
            break;

        case 'Возобновить':
            flag = 1;
            clockRun();
            this.textContent = 'Приостановить';
            clock.removeChild(savePointButton);
            clock.removeChild(resetButton);
            break;
    }
}

function clockRun() {
    if (flag === 1) {
        timerId = setTimeout(function () {
            time++;
            ms = time % 100;
            sec = Math.floor(time / 100);
            min = Math.floor(time / 100 / 60);

            if (min < 10) min = "0" + min;
            if (sec >= 60) sec = sec % 60;
            if (sec < 10) sec = "0" + sec;
            if (ms < 10) ms = "0" + ms;
            if (time >= 3.6e6) {
                alert('прошел один час!');
                return;
            }
            document.getElementById('msms').textContent = min + ':' + sec + ':' + ms;
            clockRun();
        }, 10)
    }
}

body.onclick = function (event) {
    var target = event.target;

    if (target.id === 'resetButton') {
        clearTimeout(timerId);
        document.getElementById('msms').textContent = '00:00:00';
        time = 0;
        flag = 0;
        startButton.textContent = 'Запустить';
        clock.removeChild(resetButton);
        clock.removeChild(savePointButton);

    }
};

body.addEventListener('click', showSavePoint);

function showSavePoint(evt) {
    var target = evt.target;

    if (target.id === 'savePointButton') {
        var showSavePoint = document.createElement('div');
        showSavePoint.className = 'showSavePoint';
        showSavePoint.innerHTML = 'Отметка: ' + min + ':' + sec + ':' + ms;
        body.appendChild(showSavePoint);
    }
}



