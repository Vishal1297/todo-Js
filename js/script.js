var addButton = document.getElementById('add');
var removeButton = document.getElementById('remove');
var clearButton = document.getElementById('clear');
var input = document.getElementById('input');

var data = [];

addButton.addEventListener('click', addItem);
input.addEventListener('keypress', addOnEnter)
removeButton.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearLocalStorage);

window.onload = (event) => {
    onRefresh();
};

function onRefresh() {
    data = JSON.parse(localStorage.getItem('todos')) || [];
    var ul = document.getElementById('list');

    for (let index = data.length - 1; index >= 0; index--) {
        var textNode = document.createTextNode(data[index]);
        var li = document.createElement('li');
        var label = document.createElement('label');
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('class', 'check');
        ul.appendChild(label);
        li.appendChild(checkBox);
        label.appendChild(textNode);
        li.appendChild(label);
        ul.appendChild(li);
        li.className = 'visual';
    }
}


function addOnEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addButton.click();
    }
}

function addItem() {
    var input = document.getElementById('input');
    var itemValue = input.value;
    var ul = document.getElementById('list');
    var textNode = document.createTextNode(itemValue);
    if (itemValue === '') {
        // var pTag = document.createElement('p');
        // pTag.innerHTML = 'Enter Your Todo!!';
        // input.parentNode.insertBefore(pTag, input.nextSibling);
        return false;
    } else {
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('class', 'check');
        var label = document.createElement('label');
        var li = document.createElement('li');
        ul.appendChild(label);
        li.appendChild(checkBox);
        label.appendChild(textNode);
        li.appendChild(label);
        ul.insertBefore(li, ul.childNodes[0]);
        setTimeout(() => {
            li.className = 'visual';
        }, 2);

        data.push(textNode.data);
        localStorage.setItem("todos", JSON.stringify(data));
        input.value = '';
    }

}

function removeItem() {
    data = JSON.parse(localStorage.getItem("todos")) || [];
    var ul = document.getElementById('list');
    var li = ul.children;
    for (let index = 0; index < li.length; index++) {
        while (li[index] && li[index].children[0].checked) {
            if (index > -1) {
                ul.removeChild(li[index])
                // data.splice(index, 1);
            }
        }
    }
    // location.reload();
    // return false;
}

function clearLocalStorage() {
    localStorage.clear();
    setTimeout(() => {
        location.reload();
    }, 100);
    return false;
}