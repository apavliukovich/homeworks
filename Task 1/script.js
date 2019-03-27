var inputX = document.getElementsByTagName('input')[0];
var inputY = document.getElementsByTagName('input')[1];
var inputButton = document.getElementsByTagName('input')[2];


inputX.onkeyup = btnDisabled;
inputY.onkeyup = btnDisabled;

function btnDisabled() {
    inputButton.disabled = !(inputX.value.trim() && inputY.value.trim());
}

inputButton.onclick = function () {

    var valueX = +inputX.value,
        valueY = +inputY.value;

    if (!(valueX && Number.isInteger(valueX) && valueX >= 1 && valueX <= 10)) {
        resetForm([inputX]);
        showError(inputX);
    }

    if (!(valueY && Number.isInteger(valueY) && valueY >= 1 && valueY <= 10)) {
        resetForm([inputY]);
        showError(inputY);
    }

    if (
        (valueX && Number.isInteger(valueX) && valueX >= 1 && valueX <= 10) &&
        (valueY && Number.isInteger(valueY) && valueY >= 1 && valueY <= 10)
    ) {
        resetForm([inputX, inputY]);
        drawChessBoard(valueX,valueY)
    }


    function showError(input) {
        alert('Введите корректное значение в поле ' + input.id.toUpperCase() + ' - целое число от 1 до 10.');
    }

    function resetForm(inputs) {
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }

        btnDisabled();
    }
};

function drawChessBoard(valueX,valueY) {
    var exist = document.getElementById('table');
    if (exist) exist.parentNode.removeChild(exist);

    var table = document.createElement("table");
    table.setAttribute('id', 'table');

    for (var i = 0; i < valueY; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < valueX; j++) {
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

};
window.addEventListener('click', changeColor, false);

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
