const movieId = location.search.split("=")[1];

const imagePrefix = "https://image.tmdb.org/t/p/w500/";

const main = document.querySelector(".main");

let video_path = "";

async function getMovie() {
  try {
    const { data } = await axios(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=46bb1a63bb7ff3a9db6fb1d46733f80c`
    );
    console.log(data);
    render(data);
  } catch (error) {
    console.log(error);
  }
}

getMovie();

function render(data) {
  main.innerHTML = "";
  let genres = "";
  data.genres.forEach((genre) => {
    genres += genre.name + ", ";
  });
  const render = `
  <div class="top">
        <img
          src="${imagePrefix + data.poster_path}"
          alt=""
        />
        <div class="info">
          <h2>${data.title}</h2>
          <h3>Realese: ${data.release_date.slice(0, -6)}</h3>
          <h4>Genres:</h4>
          <p>
            ${genres.slice(0, -2)}
          </p>
          <h4 class="castDiv">Cast:</h4>
          <p class="cast"></p>
        </div>
      </div>
      <div class="last">
        <div class="overview">
            ${data.overview}
        </div>
        <iframe
      id="myIframe"
      width="99.8%"
      height="500"
      src=""
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
      </div>
  `;
  main.insertAdjacentHTML("beforeend", render);
  video();
  cast();
}
async function video() {
  try {
    const {
      data: { results },
    } = await axios(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=46bb1a63bb7ff3a9db6fb1d46733f80c`
    );
    const iFrame = document.querySelector("#myIframe");
    iFrame.src = `https://www.youtube.com/embed/${results[1].key}`;
  } catch (error) {
    console.log(error);
  }
}

async function cast() {
  try {
    const { data } = await axios(`
        https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=46bb1a63bb7ff3a9db6fb1d46733f80c`);
    console.log(data.cast);
    const castList = document.querySelector(".cast");
    let castListNew = "";
    data.cast.forEach((person) => {
      castListNew += person.name + ", ";
    });
    castList.textContent = "Cast: " + castListNew.slice(0, -2);
  } catch (error) {
    console.log(error);
  }
}
