const url = "https://solar-poised-salad.glitch.me/yurii";
const mainContainer = document.querySelector(".mainConteinerBottom");

async function getItems() {
  try {
    const { data } = await axios(url);
    console.log(data);
    render(data);
  } catch (error) {
    console.log(error);
  }
}

getItems();

function render(data) {
  mainContainer.innerHTML = "";
  data.forEach((element) => {
    const content = `
    <div class="item">
              <img class="productImg" id="${element.id}" src="${element.imageUrl}" alt="">
              <div class="itemName" id="${element.id}">${element.title}</div>
              <div class="price"><b>$${element.price}</b></div>
                <button data-item-id="${element.id}" class="delete"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
    `;
    mainContainer.insertAdjacentHTML("beforeend", content);

    const productImg = document.querySelectorAll(".productImg");
    productImg.forEach((el) => {
      el.addEventListener("click", function () {
        location.href = `product.html?item_id=${this.id}`;
      });
    });
    const title = document.querySelectorAll(".itemName");
    title.forEach((el) => {
      el.addEventListener("click", function () {
        location.href = `product.html?item_id=${this.id}`;
      });
    });
  });
  

  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentItem = data.find(
        (item) => item.id === parseInt(this.dataset.itemId)
      );
      console.log(currentItem);
      deleteData(currentItem.id);
    });
  });
}




const deleteData = async (id) => {
  try {
    const response = await axios.delete(url + `/${id}`);
    console.log(response);
    mainContainer.innerHTML = "";
    getItems();
  } catch (error) {
    console.log(error);
  }
};
