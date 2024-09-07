const url = "https://solar-poised-salad.glitch.me/yurii";

const title = document.querySelector(".title");
const image = document.querySelector(".imageContainer input");
const discription = document.querySelector(".discription textarea");
const category = document.querySelector("#products");
const price = document.querySelector(".price input");
const submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", () => {
  const newProduct = {
    title: title.value,
    imageUrl: image.value,
    discription: discription.value,
    category: category.value,
    price: price.value,
  };
  addProduct(newProduct);
});

async function addProduct(product) {
  try {
    const { data } = await axios.post(
      "https://solar-poised-salad.glitch.me/yurii",
      JSON.stringify(product),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    alert("Product successfully added");
  } catch (error) {
    console.log(error);
  }
}
