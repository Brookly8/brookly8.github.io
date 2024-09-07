render();

function render() {
  const allProductsCart = JSON.parse(localStorage.getItem("cart")) || [];
  const mainContainer = document.querySelector(".mainConteinerBottom");
  mainContainer.innerHTML = "";
  allProductsCart.forEach((item) => {
    console.log(item);
    content = `
    <div class="cartItem">
      <div class="imgDiv">
              <img src="${item.imageUrl}" alt="">
          </div>
          <div>
          <h2 class="productName">${item.title}</h2>
          <p class="discription">${item.discription}</p>
          <p>Price: ${item.price}</p>
          <p>Category: ${item.category}</p>
      </div>
      <button data-item-id="${item.id}" class="deleteFromCart">Delete from Cart</button>
      </div>
      `;
    mainContainer.insertAdjacentHTML("beforeend", content);
  });

  const deleteBtn = document.querySelectorAll(".deleteFromCart");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const currentItem = allProductsCart.find(
        (item) => item.id === parseInt(this.dataset.itemId)
      );
      const index = allProductsCart.indexOf(currentItem);
      newArr = allProductsCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(allProductsCart));
      render();
    });
  });

  const order = document
    .querySelector(".order")
    .addEventListener("click", () => {
      alert("Your order is pending");
      location.href = "index.html";
    });
}
