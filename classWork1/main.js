const tasks = {};

const button = document.querySelector(".addTaskButton");
const input = document.querySelector("input");
const tasksDiv = document.querySelector(".tasksMain");
userId = 0;
button.addEventListener("click", () => {
  userId++;
  tasks.id = userId;
  tasks.title = input.value;
  tasks.status = "toDo";

  const task = `
    <div class="task">
  <p>${tasks.id}</p>
  <p>${tasks.title}</p>
  <p>${tasks.status}</p>
  <button class="removeButton"></button>
  </div>`;
  tasksDiv.insertAdjacentHTML("beforeend", task);

  const value = input.value;
  if (value) {
    input.value = "";
  }
});
