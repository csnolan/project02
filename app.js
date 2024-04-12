document.addEventListener("DOMContentLoaded", function () {
  
  function displayTasks() {
    const tasksDisplay = document.getElementById("tasksDisplay");
    tasksDisplay.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task-item");
      const titleClass = task.status === "Complete" ? 'task-title-complete' : '';
      taskElement.innerHTML = `
        <div class="task-details">
          <div class="task-title">${task.title}</div>
          <div class="task-desc">${task.description}</div>
        </div>
        <div class="task-meta">
          <div class="task-priority">${task.priority}</div>
          <div class="task-status">${task.status}</div>
        </div>
        <div class="task-actions">
          <button class="btn btn-danger delete-task" data-index="${index}">Delete</button>
          <button class="btn btn-info toggle-status" data-index="${index}">
            ${task.status === "Complete" ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
        </div>
      `;
      tasksDisplay.appendChild(taskElement);
    });
  }

  
  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }

  
  function toggleTaskStatus(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].status =
      tasks[index].status === "Complete" ? "Incomplete" : "Complete";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }


  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const priorityButton = document.getElementById("priority-button");
      priorityButton.textContent = this.textContent;
      priorityButton.setAttribute("data-priority", this.textContent);
    });
  });

  const form = document.querySelector(".todo-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskTitle = document.getElementById("task-title").value;
    const taskDesc = document.getElementById("task-desc").value;
    const priorityButton = document.getElementById("priority-button");
    const taskPriority =
      priorityButton.getAttribute("data-priority") || "Not set";

    const task = {
      title: taskTitle,
      description: taskDesc,
      priority: taskPriority,
      status: "Incomplete",
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("priority-button").textContent = "Priority";
    document.getElementById("priority-button").removeAttribute("data-priority");
    alert("Task added successfully!");
    displayTasks();
  });
 
  const tasksDisplay = document.getElementById("tasksDisplay");
  tasksDisplay.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-task")) {
      const index = event.target.getAttribute("data-index");
      deleteTask(index);
    }

    if (event.target.classList.contains("toggle-status")) {
      const index = event.target.getAttribute("data-index");
      toggleTaskStatus(index);
    }
  });

  displayTasks();
});
