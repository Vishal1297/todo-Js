var addButton = document.getElementById('add');
var removeButton = document.getElementById('remove');
var clearButton = document.getElementById('clear');
var input = document.getElementById('input');

var data = [];

var toDoHandlers = function() {
    addButton.addEventListener('click', validateToDo);
    clearButton.addEventListener('click', clearLocalStorage);
    removeButton.addEventListener('click', removeToDo);
};

window.onload = function(){
    toDoHandlers();
};

var addToDo = function() {
    var todo = {
        text: input.value,
        status: 'incomplete',
        id: generateId()
    };
    
    addToDoToDom(todo);
    addToDoToStorage(todo);
};

var validateToDo = function(event) {
    event.preventDefault();
    if(!input.value) {
        document.getElementById('error').innerHTML = 'Please Enter Your Todo!!';
        // var pTag = document.createElement('p');
        // pTag.innerHTML = 'Enter Your Todo!!';
        // input.parentNode.insertBefore(pTag, input.nextSibling);
    } else {
        addToDo();
    }
};

input.onkeydown = function(event) {
    if(event.keyCode === 13) {
        event.preventDefault();
        validateToDo(event);
        return false;
    }
};

function addToDoToDom(todo) {
    var ul = document.getElementById('list');
    var textNode = document.createTextNode(todo.text);
    var checkBox = document.createElement('input');
    
    checkBox.type = 'checkbox';
    checkBox.setAttribute('class', 'check');
    var label = document.createElement('label');
    var li = document.createElement('li');
    ul.appendChild(label);
    li.appendChild(checkBox);
    label.appendChild(textNode);
    li.appendChild(label);
    
    li.setAttribute('data-status', todo.status);
    li.setAttribute('data-id', todo.id);
    
    ul.insertBefore(li, ul.childNodes[0]);
    setTimeout(() => {
        li.className = 'visual';
    }, 2);
    input.value='';
}

var addToDoToStorage = function(todo) {
    data.push(todo);
    localStorage.setItem('todos', JSON.stringify(data));
};

var loadToDosFromStorage = function() {
    var str = localStorage.getItem('todos');
    if (str) {
        data = JSON.parse(str);
    }
    for (var i=0; i<data.length; i++) {
        addToDoToDom(data[i]);
    }
};

function generateId () {
    var charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charSetSize = charSet.length;
    var charCount = 8;
    var id = '';
    for (var i = 1; i <= charCount; i++) {
        var randPos = Math.floor(Math.random() * charSetSize);
        id += charSet[randPos];
    }
    return id;
}

function removeToDo() {
    data = JSON.parse(localStorage.getItem("todos")) || [];
    var ul = document.getElementById('list');
    var li = ul.children;
    for (let index = 0; index < li.length; index++) {
        var toDoId = li[index].getAttribute('data-id');
        for (let i = 0; i < data.length; i++) {
            if (li[index] && li[index].children[0].checked && data[i].id === toDoId) {
                console.log("Id's :: ", toDoId, data[i].id)
                console.log("Text :: ", data[i]);
                data.splice(i, 1);
            }
        }
        while (li[index] && li[index].children[0].checked) {
            ul.removeChild(li[index]);
        }
    }
    localStorage.setItem('todos', JSON.stringify(data));
}

function clearLocalStorage() {
    localStorage.clear();
    setTimeout(() => {
        location.reload();
    }, 80);
    return false;
}

loadToDosFromStorage();