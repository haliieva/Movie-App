const API_KEY = "77b09ce8-816a-4450-b983-0602729dd262";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const form = document.getElementById("search-form");
const search = document.querySelector(".header-search");

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await response.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7 || vote >= "80%") {
    return "green";
  } else if (vote > 5 || vote > "70%") {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  //Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");
    movieEl.innerHTML = `             
         <div class="movie-cover-inner">
        <img 
        src="${movie.posterUrlPreview}"
        class = "movie-cover"
        alt = "${movie.nameRu}"
        />
        <div class="movie-cover-darkened"></div>
    </div>
  <div class="movie-info">
    <div class="movie-title">${movie.nameRu}</div>
    <div class="movie-category">${movie.genres.map(
      (genre) => ` ${genre.genre}`
    )}</div>
    <div class="movie-average movie-average__${getClassByRate(movie.rating)}">${
      movie.rating
    }</div>
  </div>
  `;

    moviesEl.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});
