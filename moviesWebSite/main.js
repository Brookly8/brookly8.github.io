import { movies } from "./data.js";

const leftSide = document.querySelector(".leftSide");
const rightSide = document.querySelector(".rightSide");

const favoriteMovies = [];

function render() {
  movies.forEach((element) => {
    const movie = `
    <div class="movie">
          <img src="${element.poster_path}"/>
        <div class="titleMain">
            <h3 class="title">Title: ${element.original_title}</h3>
            <h4 class="votes">IMdB: ${element.vote_average}</h4>
          </div>
          <p class="discription">${element.overview}</p>
          <div><button class="addFavorite">Add to Favorite</button></div>
        </div>
        
    `;

    leftSide.insertAdjacentHTML("beforeend", movie);
  });

  const addFavorite = document.querySelectorAll(".addFavorite");

  addFavorite.forEach((button) => {
    const btn =
      button.parentElement.previousElementSibling.previousElementSibling.firstElementChild.textContent.slice(
        7
      );

    button.addEventListener("click", () => {
      if (!favoriteMovies.includes(btn)) {
        favoriteMovies.push(btn);

        const finalTitle = favoriteMovies[favoriteMovies.length - 1];
        const favorites = `
        <div class = "FavContainer">
        <li>${finalTitle}</li>
        <i class="fa-solid fa-trash removeBtn"></i>
        </div>`;
        rightSide.insertAdjacentHTML("beforeend", favorites);

        const removeButtons = document.querySelectorAll(".removeBtn");

        removeButtons.forEach((button) => {
          button.addEventListener("click", function () {
            this.parentElement.remove();
          });
        });
      }
    });
  });
}

render();
