const apiKey = "46bb1a63bb7ff3a9db6fb1d46733f80c";
const url = "https://api.themoviedb.org/3/movie/popular?api_key=";
const main = document.querySelector(".main");
const imagePrefix = "https://image.tmdb.org/t/p/w500/";

renderFavorites();
function renderFavorites() {
  const allFavorites = JSON.parse(localStorage.getItem("favs")) || [];
  const favsContainer = document.querySelector(".mainFav");
  favsContainer.innerHTML = "";
  allFavorites.forEach((movie) => {
    console.log(movie);
    container = `
    <div class="favorite">
        <div id="${movie.id}" class="left">
          <img src="${imagePrefix + movie.poster_path}" alt="" />
        </div>
        <div class="right">
          <div>
            <h3 class="title" id="${movie.id}" >${movie.title}</h3>
            <p>
              ${movie.overview}
            </p>
            <h4>Realise: ${movie.release_date.slice(0, -6)}</h4>
          </div>
          
        </div>
        <div class="deleteDiv">
        <button data-movie-id="${
          movie.id
        }" class="deleteBtn">Delete from Favorites</button>
        </div>
      </div>
    `;
    favsContainer.insertAdjacentHTML("beforeend", container);
  });

  const title = document.querySelectorAll(".title");
  title.forEach((el) => {
    el.addEventListener("click", function () {
      location.href = `movie.html?movieId=${this.id}`;
    });
  });

  const poster = document.querySelectorAll(".left");
  poster.forEach((el) => {
    el.addEventListener("click", function () {
      location.href = `movie.html?movieId=${this.id}`;
    });
  });

  const deleteFav = document.querySelectorAll(".deleteBtn");
  const deleteModel = document.querySelector(".forDelete");
  const deleteModelBtn = document.querySelector(".deleteModel");
  const cancelModelBtn = document.querySelector(".cancelModel");

  deleteFav.forEach((btn) => {
    btn.addEventListener("click", function () {
      deleteModel.style.display = "flex";
      deleteModelBtn.addEventListener("click", () => {
        const currentMovie = allFavorites.find(
          (movie) => movie.id === parseInt(this.dataset.movieId)
        );
        const index = allFavorites.indexOf(currentMovie);
        newArr = allFavorites.splice(index, 1);
        localStorage.setItem("favs", JSON.stringify(allFavorites));
        deleteModel.style.display = "none";
        renderFavorites();
      });
      cancelModelBtn.addEventListener("click", () => {
        deleteModel.style.display = "none";
      });
    });
  });
}
