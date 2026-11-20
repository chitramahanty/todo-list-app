
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";
    const emptyMessage = document.getElementById("emptyMessage");

if (tasks.length === 0) {
    emptyMessage.style.display = "block";
} else {
    emptyMessage.style.display = "none";
}

    tasks.forEach(function(task, index) {
        document.getElementById("taskCount").textContent =
    "Total tasks: " + tasks.length;
        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        if (task.completed) {
            taskSpan.classList.add("completed");
        }

        taskSpan.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
});

displayTasks();
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});
const clearAllBtn = document.getElementById("clearAllBtn");


clearAllBtn.addEventListener("click", function() {
    if (tasks.length === 0) {
        alert("There are no tasks to clear!");
        return;
    }

    const confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});




