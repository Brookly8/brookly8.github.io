const apiKey = "46bb1a63bb7ff3a9db6fb1d46733f80c";
const url = "https://api.themoviedb.org/3/movie/popular?api_key=";
const main = document.querySelector(".main");
const imagePrefix = "https://image.tmdb.org/t/p/w500/";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmJiMWE2M2JiN2ZmM2E5ZGI2ZmIxZDQ2NzMzZjgwYyIsIm5iZiI6MTcyNDUyMTE5Ni4yODQwNjgsInN1YiI6IjY2Y2EwZmViMTRhZGE0Y2E0MWVhYjU0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LTTbhd6g3Yaiv1cdAnYcBFR9ZVUNWu8KkMyBMGRTE9Y",
  },
};

const favorites = JSON.parse(localStorage.getItem("favs")) || [];

async function getMuvies() {
  try {
    const response = await axios(url + apiKey);
    render(response.data.results);
  } catch (error) {
    console.log(error);
  }
}

getMuvies();

function render(data) {
  main.innerHTML = "";
  console.log(data);
  data.forEach((element) => {
    const render = `
    <div class="movie">
        <div id="${element.id}" style="background-image: url(${
      imagePrefix + element.poster_path
    })" class="backGround">
          <div class="rate">${element.vote_average.toFixed(1)}</div>
          <button class="favorites" data-movie-id="${
            element.id
          }">Add to<br> favorites</button>
        </div>
        <div class="about">
          <h3 id="${element.id}" class="title">${element.title}</h3>
          <p>
            ${element.overview}
          </p>
          </div>
      </div>
    `;
    main.insertAdjacentHTML("beforeend", render);
  });

  const title = document.querySelectorAll(".title");
  title.forEach((el) => {
    el.addEventListener("click", function () {
      location.href = `movie.html?movieId=${this.id}`;
    });
  });

  const favBtn = document.querySelectorAll(".favorites");
  favBtn.forEach((el) => {
    el.addEventListener("click", function () {
      const currentMovie = data.find(
        (movie) => movie.id === parseInt(this.dataset.movieId)
      );
      const movieExists = favorites.some(
        (movie) => movie.id === currentMovie.id
      );

      if (movieExists) {
        alert("Movie already in your favorites");
      } else {
        favorites.push(currentMovie);
        localStorage.setItem("favs", JSON.stringify(favorites));
        alert("Added to favorites");
      }
    });
  });

  const searchContainer = document.querySelector("input");
  const searchBtn = document
    .querySelector(".searchBtn")
    .addEventListener("click", () => {
      console.log(searchContainer.value);
      search(searchContainer.value);
      searchContainer.value = "";
    });

  searchContainer.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      search(searchContainer.value);
      searchContainer.value = "";
    }
  });
}

async function search(movieName) {
  try {
    const { data } = await axios(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
      options
    );
    render(data.results);
  } catch (error) {
    console.log(error);
  }
}

const genresContainer = document.querySelector(".genres");

async function getGenres() {
  try {
    const { data } = await axios(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );
    console.log(data.genres);
    data.genres.forEach((genre) => {
      const content = `<p class="genreItem" data-genre-id="${genre.id}">${genre.name}</p>`;
      genresContainer.insertAdjacentHTML("beforeend", content);
    });

    const genreContainer = document.querySelectorAll(".genreItem");
    genreContainer.forEach((genre) => {
      genre.addEventListener("click", function () {
        const currentGenre = data.genres.find(
          (genre) => genre.id === parseInt(this.dataset.genreId)
        );
        console.log(currentGenre);
        filterByGenres(currentGenre.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
getGenres();

async function filterByGenres(genreId) {
  try {
    const { data } = await axios(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
      options
    );
    render(data.results);
  } catch (error) {
    console.log(error);
  }
}
