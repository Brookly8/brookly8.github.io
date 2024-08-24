const url = "https://solar-poised-salad.glitch.me/products/";
const main = document.querySelector(".mainDiv");
const updateDiv = document.querySelector(".update");
const updateBtn = document.querySelector(".updButton");
const updateTitle = document.querySelector(".updTitle");
const updateImage = document.querySelector(".updImage");
const updateDis = document.querySelector(".updDiscription");
const updatePrice = document.querySelector(".updPrice");
const delBtn = document.querySelector(".deleteBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const deleteDiv = document.querySelector(".deleteDiv");

const getData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach((element) => {
      const item = `<div class="item">
        <img
          src="${element.imageUrl}"
          alt=""
        />
        <div class="secondDiv">
          <h2 class="title">${element.title}</h2>
          <p class="discription">${element.description}</p>
          <h3 class="price">${element.price}</h3>
        </div>
        <div class="buttons">
          <button data-index="${element.id}" class="edit">Edit</button>
          <button data-index="${element.id}" class="delete">Delete</button>
        </div>
      </div>`;
      main.insertAdjacentHTML("beforeend", item);
    });
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const getItem = data.find((oneItem) => oneItem.id == index);
        deleteDiv.style.display = "flex";
        cancelBtn.addEventListener(
          "click",
          () => (deleteDiv.style.display = "none")
        );
        delBtn.addEventListener("click", () => {
          deleteData(getItem.id);
          deleteDiv.style.display = "none";
        });
      });
    });

    const mainUpdButton = document.querySelectorAll(".edit");
    mainUpdButton.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        updateDiv.style.display = "flex";
        const index = e.target.getAttribute("data-index");
        const getItem = data.find((oneItem) => oneItem.id == index);
        updateBtn.addEventListener("click", () => {
          newObj = {
            imageUrl: updateImage.value,
            title: updateTitle.value,
            description: updateDis.value,
            price: updatePrice.value,
          };
          updateData(getItem.id, newObj);
          updateDiv.style.display = "none";
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

getData();

const deleteData = async (id) => {
  try {
    const response = await fetch(url + `/${id}`, {
      method: "DELETE",
    });
    main.innerHTML = "";
    getData();
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (id, newObj) => {
  try {
    const response = await fetch(url + `/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObj),
    });
    main.innerHTML = "";
    getData();
  } catch (error) {
    console.log(error);
  }
};
