const tasks = {};

const button = document.querySelector(".addTaskButton");
const input = document.querySelector("input");
const tasksDiv = document.querySelector(".tasksMain");
userId = 0;

function render() {
  userId++;
  tasks.id = userId;
  tasks.title = input.value;
  tasks.status = "toDo";

  const task = `
      <div class="task">
    <p>${tasks.id}</p>
    <p>${tasks.title}</p>
    <p>${tasks.status}</p>
    <button class="removeButton"><i class="fa-solid fa-trash"></i></button>
    </div>`;
  tasksDiv.insertAdjacentHTML("beforeend", task);

  const value = input.value;
  if (value) {
    input.value = "";
  }

  const removeButtons = document.querySelectorAll(".removeButton");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.parentElement.remove();
    });
  });
}

button.addEventListener("click", () => {
  render();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    render();
  }
});
