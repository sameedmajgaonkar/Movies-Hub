import {
  api_key,
  baseUrl,
  baseImageUrl,
  baseBackdropUrl,
} from "./api_config.js";
import getData from "./data.js";

const container = document.querySelector(".container");

async function showData(filter) {
  const movies = await getData(filter);
  movies.results.map((movie) => {
    console.log(movie)
    const { poster_path, title, overview, id } = movie;
    const card = document.createElement("div");
    card.classList.add("card");
    container.appendChild(card);
    card.innerHTML = `        
        <div class="card-details">
          <div class="title">${title}</div>
          <div class="desc">
            <button class="trailer-btn btn" data-id=${id}">Play <i class="fa-solid fa-play"></i></button>
          </div>
        </div>`;
    card.style.background = `url(${baseImageUrl}${poster_path})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundRepeat = "no-repeat";
  });
}

export default showData;
