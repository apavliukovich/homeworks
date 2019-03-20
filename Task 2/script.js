var addTr = document.getElementById('addTr');
var tBody = document.getElementsByTagName('tbody')[0];

addTr.addEventListener('click', trAdd);

function trAdd() {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td></td><td></td><td></td>';

    tBody.insertBefore(tr, tBody.firstChild);
}

tBody.addEventListener('click', setInput);

function setInput(event) {
    var target = event.target;
    var val = target.textContent;

    if (target.tagName === 'TD') {
        target.innerHTML = '<input type = "text" id = "edit" onblur = kill(this) onkeydown = killByEnter(event,this) />';
        document.getElementById('edit').value = val;
        document.getElementById('edit').focus()
    }
}

function killByEnter(event, element) {
    if (event.keyCode === 13) {
        var v = element.value;
        element.parentNode.textContent = v;
        element.blur();
    }
}

function kill(event) {
    var v = event.value;
    event.parentNode.textContent = v;
}


