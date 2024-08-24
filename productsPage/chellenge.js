const url = "https://solar-poised-salad.glitch.me/products/";

const imgInput = document.querySelector(".imageInput");
const titleInput = document.querySelector(".titleInput");
const description = document.querySelector("#description");
const number = document.querySelector(".number");
const addProduct = document.querySelector("button");
const main = document.querySelector(".main");
const back = document.querySelector(".goBack");

addProduct.addEventListener("click", (e) => {
  const newObject = {
    imageUrl: imgInput.value,
    title: titleInput.value,
    description: description.value,
    price: number.value,
  };
  add(newObject);
});

const add = async (product) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log(data);
    back.style.display = "flex";
  } catch (error) {
    console.log(error);
  }
};
