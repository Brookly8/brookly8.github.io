const itemId = location.search.split("=")[1];
const url = "https://solar-poised-salad.glitch.me/yurii";
const mainContainer = document.querySelector(".mainConteinerBottom");

const orders = JSON.parse(localStorage.getItem("cart")) || [];

async function getItem() {
  try {
    const { data } = await axios(url + `/${itemId}`);
    console.log(data);
    render(data);
  } catch (error) {
    console.log(error);
  }
}
getItem();

function render(data) {
  content = `
    <div class="imgDiv">
            <img src="${data.imageUrl}" alt="">
        </div>
        <div>
        <h2 class="productName">${data.title}</h2>
        <p class="discription">${data.discription}</p>
        <p>Price: ${data.price}</p>
        <p>Category: ${data.category}</p>
    </div>
    <div class="cartBtn">
        <button class="addToCart">Add to cart</button>
    </div>
    `;
  mainContainer.insertAdjacentHTML("beforeend", content);

  const cartBtn = document.querySelectorAll(".addToCart");
  cartBtn.forEach((el) => {
    el.addEventListener("click", function () {
      const currentItem = data;
      const itemExists = orders.some((item) => item.id === currentItem.id);

      if (itemExists) {
        alert("Item already in your cart");
      } else {
        orders.push(currentItem);
        localStorage.setItem("cart", JSON.stringify(orders));
        alert("Added to cart");
      }
    });
  });
}
