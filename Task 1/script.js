var inputX = document.getElementsByTagName('input')[0];
var inputY = document.getElementsByTagName('input')[1];
var inputButton = document.getElementsByTagName('input')[2];
var valueX, valueY;

inputX.onkeyup = function () {
    valueX = +inputX.value;
    if (typeof valueX === 'number' && 0 < valueX && valueX < 10 && !!valueX) {
        inputButton.removeAttribute('disabled');
    } else {
        inputButton.setAttribute('disabled', 'disabled');
        alert('Введено некорректное значение!');
    }
};
inputY.onkeyup = function () {
    valueY = +inputY.value;
    if (typeof valueY === 'number' && 0 < valueY && valueY < 10 && !!valueY) {
        inputButton.removeAttribute('disabled');
    } else {
        inputButton.setAttribute('disabled', 'disabled');
        alert('Введено некорректное значение!');
    }
};

inputButton.onclick = function () {
    var exist = document.getElementById('table');
    if (exist) exist.parentNode.removeChild(exist);

    var table = document.createElement("table");
    table.setAttribute('id', 'table');

    for (var i = 0; i < valueX; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < valueY; j++) {
            var td = document.createElement('td');
            if (i % 2 === j % 2) {
                td.className = "white";
            } else {
                td.className = "black";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
    table.addEventListener('click', changeColor, false);
};

function changeColor(evt) {
    var target = evt.target;
    if (target.tagName === 'TD') {
        var alltd = document.getElementsByTagName('td');

        for (var i = 0; i < alltd.length; i++) {
            var elem = alltd[i];
            if (elem.classList.contains('white')) {
                elem.classList.add('black');
                elem.classList.remove('white');
            } else if (elem.classList.contains('black')) {
                elem.classList.add('white');
                elem.classList.remove('black');
            }
        }
    }
}
