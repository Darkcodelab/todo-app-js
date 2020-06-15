const textInput = document.getElementById('textInput');
const addButton = document.getElementById("addButton");
const todoUl = document.getElementById("todo-ul");

backup();


function addTodo(e) {
    e.preventDefault();
    if (textInput.value == "") {
        alert("todo cannot be empty")
    } else {
        let todoValue = textInput.value;
        let todoDiv = document.createElement("div");
        let todoLi = document.createElement("li");
        let completedDiv = document.createElement("div");
        let deleteDiv = document.createElement("div");

        todoDiv.classList.add("todo-div");
        completedDiv.classList.add("completedDiv");
        deleteDiv.classList.add("deleteDiv");

        todoLi.innerHTML = todoValue;

        completedDiv.innerHTML = "<i class='fas fa-check'></i>";
        deleteDiv.innerHTML = "<i class='fas fa-trash'></i>";

        completedDiv.addEventListener("click", completeTodo);
        deleteDiv.addEventListener("click", deleteTodo);
        todoDiv.appendChild(todoLi);
        todoDiv.appendChild(completedDiv);
        todoDiv.appendChild(deleteDiv);
        todoUl.appendChild(todoDiv);
        setTodoStorage(todoValue);
        textInput.value = ""

    }

}

function setTodoStorage(todoValue) {
    let todoStorage = [];
    let getItem = window.localStorage.getItem("todos");
    if (getItem === null) {
        console.log('null');
        todoStorage.push(todoValue);
        window.localStorage.setItem("todos", JSON.stringify(todoStorage));
    } else {
        let localStorageTodo = window.localStorage.getItem("todos");
        let parsed = JSON.parse(localStorageTodo);
        parsed.push(todoValue);
        window.localStorage.setItem("todos", JSON.stringify(parsed))
    }


}

function backup() {
    if (window.localStorage.getItem('todos') != null) {
        let localStorageTodos = window.localStorage.getItem("todos");
        let parsed = JSON.parse(localStorageTodos);
        parsed.forEach(todo => {
            let todoDiv = document.createElement("div");
            let todoLi = document.createElement("li");
            let completedDiv = document.createElement("div");
            let deleteDiv = document.createElement("div");

            todoDiv.classList.add("todo-div");
            completedDiv.classList.add("completedDiv");
            deleteDiv.classList.add("deleteDiv");

            todoLi.innerHTML = todo;
            completedDiv.addEventListener("click", completeTodo);
            deleteDiv.addEventListener("click", deleteTodo);

            completedDiv.innerHTML = "<i class='fas fa-check'></i>";
            deleteDiv.innerHTML = "<i class='fas fa-trash'></i>";
            todoDiv.appendChild(todoLi);
            todoDiv.appendChild(completedDiv);
            todoDiv.appendChild(deleteDiv);
            todoUl.appendChild(todoDiv);

        })
    }
}


addButton.addEventListener("click", addTodo);

function deleteTodo() {
    let parent = this.parentNode;
    // console.log(parent.children[0].innerText)
    parent.classList.add("deleteAnimation")
    setTimeout(function () {
        parent.parentNode.removeChild(parent);
    }, 600)
    let LStodos = window.localStorage.getItem("todos");

    let parsed = JSON.parse(LStodos);
    let newArr = parsed.filter(e => {
        return e != parent.children[0].innerText;
    })

    window.localStorage.setItem("todos", JSON.stringify(newArr));
};

function completeTodo() {
    this.parentNode.classList.toggle("task-completed");



};

function getLocalStorage() {
    return window.localStorage.getItem("todos")
}