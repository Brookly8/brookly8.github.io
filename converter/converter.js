const inputValue = document.querySelector(".number");
const calculateBtn = document.querySelector(".calculate");
const clearBtn = document.querySelector(".clear");
const firstValue = document.querySelector("#from");
const secondValue = document.querySelector("#to");
const resultField = document.querySelector(".resultField");

clearBtn.addEventListener("click", () => {
  resultField.innerHTML = "";
  inputValue.value = "";
});

calculateBtn.addEventListener("click", () => {
  const value1 = firstValue.value;
  const value2 = secondValue.value;
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${value1}.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      result = inputValue.value * data[`${value1}`][`${value2}`];
      resultField.textContent = "";
      const onScreen = `
      <h2>
      ${inputValue.value} ${value1.toUpperCase()} = ${result.toFixed(
        2
      )} ${value2.toUpperCase()}
      </h2>
      <h3>1 ${value1.toUpperCase()} = ${
        data[`${value1}`][`${value2}`]
      }  ${value2.toUpperCase()}</h3>`;

      const numberChecker = parseInt(inputValue.value);
      if (isNaN(numberChecker)) {
        resultField.textContent = "Enter the amount";
      } else {
        resultField.insertAdjacentHTML("beforeend", onScreen);
        inputValue.value = "";
      }
    })
    .catch((error) => console.log(error));
});
