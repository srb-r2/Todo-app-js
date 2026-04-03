
const newTask = document.querySelector('.new-task');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById("todo-list");
const numTasks = document.getElementById("tasks");
const newBtn = document.getElementById('new-btn');
const addBtn = document.getElementById("add-btn");
const clearCompleted = document.getElementById("clear-completed");
const filters = document.querySelectorAll(".filter");
const darkMode = document.getElementById("dark-mode");

let currentFilter = "All";
let mode = false;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

printTodo();
updateClock();
setInterval(updateClock, 1000);

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        currentFilter = filter.dataset.filter;
        filters.forEach(element => {
            element.classList.remove("active");
        });
        filter.classList.add("active");
        printTodo();
    })
})


newBtn.addEventListener("click", () => {
    newTask.classList.add('active');
});

addBtn.addEventListener("click", () => {
    addTask(taskInput.value);
});

clearCompleted.addEventListener("click", () => {
    clearCompletedTasks();
});

darkMode.addEventListener("click", changeMode)





function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    printTodo();
}

function addTask(text) {
    if (text.trim() === "") return;

    const todo = {
        id: Date.now(),
        text,
        completed: false,
    }

    tasks.push(todo);
    taskInput.value = "";
    newTask.classList.remove('active');
    saveTask();

}

function printTodo() {
    filtredTasks = tasks;

    if (currentFilter === 'Active') {
        filtredTasks = tasks.filter(todo => !todo.completed);
    } else if (currentFilter === 'Completed') {
        filtredTasks = tasks.filter(todo => todo.completed);
    }
    numTasks.textContent = `${filtredTasks.filter(todo => !todo.completed).length} Tasks`;

    todoList.innerHTML = "";
    filtredTasks.forEach(todo => {

        const todoItem = document.createElement("li");

        const taskContainer = document.createElement("label");
        taskContainer.classList.add("task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => completTodo(todo.id));

        const taskText = document.createElement("p");
        taskText.classList.add("task-text");
        taskText.textContent = todo.text;

        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskText);

        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fas");
        deleteBtn.classList.add("fa-times");
        deleteBtn.classList.add("delete-btn")
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

        todoItem.appendChild(taskContainer);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);

    });
}
function completTodo(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTask();
}
function deleteTodo(id) {
    tasks = tasks.filter((todo) => todo.id !== id);
    saveTask();
}

function clearCompletedTasks() {
    tasks = tasks.filter((todo) => !todo.completed)
    saveTask();
}


function changeMode() {
    if (!mode) {
        darkMode.innerHTML = `<i class="fa-regular fa-sun"></i>`;
        mode = true;
    } else {
        darkMode.innerHTML = `<i class="fa-regular fa-moon"></i>`;
        mode = false;
    }
    document.body.classList.toggle("dark");

}



function updateClock() {
    const now = new Date();
    const date = now.toDateString();
    const hours = now.getHours().toString().padStart(2, 0)
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0)

    const timeString = `  ${hours}:${minutes}:${seconds}`
    document.getElementById("date").innerHTML = date + "<br>" + timeString;
}


