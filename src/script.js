import {
  api_key,
  baseUrl,
  baseImageUrl,
  baseBackdropUrl,
} from "./api_config.js";

import getData from "./data.js";
const container = document.querySelector(".container");

getData();
async function showData() {
  const movies = await getData();
  movies.results.map((movie) => {
    const { poster_path, title, overview,id } = movie;
    const card = document.createElement("div");
    card.classList.add("card");
    container.appendChild(card);
    card.innerHTML = `        
        <div class="card-details">
          <div class="title">${title}</div>
          <div class="desc">
            <button class="trailer-btn btn" data-id=${id}>Play <i class="fa-solid fa-play"></i></button>
          </div>
        </div>`;
    card.style.background = `url(${baseImageUrl}${poster_path})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundRepeat = "no-repeat";
  });
}

//

showData();

const genre =
  "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=4a62115ba734264aaf72971447087cf4";

async function getCarouselImages() {
  const slides = document.querySelector("[data-slides]");
  const movies = await getData();
  movies.results.map((movie) => {
    const { backdrop_path, title, overview, id } = movie;
    const info = document.createElement("div");
    info.classList.add("info");
    const list_item = document.createElement("li");
    list_item.classList.add("slide");
    list_item.style.backgroundImage = `url(${baseBackdropUrl}${backdrop_path})`;
    slides.appendChild(list_item);
    info.innerHTML = `    
    <p class="carousel-title">${title}</p>
    <p class="carousel-overview">${overview}</p>
    <button class="trailer-btn" data-id=${id}>Watch Now <i class="fa-solid fa-play"></i></button>`;
    list_item.appendChild(info);
  });
  slides.children[0].dataset.active = true;
}



async function getDetails() {
  await getCarouselImages();
  const buttons = document.querySelectorAll(".trailer-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      console.log("clicked")
      const main = document.querySelector("main");
      const template = document.querySelector("#template");
      const clone = template.content.cloneNode(true);
      main.innerHTML = "";
      main.appendChild(clone);
      const player = document.querySelector("iframe");
      const details = document.querySelector(".details");
      const id = button.dataset.id;
      const data = await getData(`movie/${id}?`);
      const { original_title, overview, tagline, release_date, homepage, genres } =
      data;
      console.log(data);
      ;
      let genres_list = []
      const genre= genres.forEach(genre => genres_list.push(genre.name))
      console.log(genres_list)
      const key = await getTrailer(id);
      details.innerHTML = `
      <p class="details-title">${original_title}</p>
      <p class="details-tagline"><span>&#8220;</span>${tagline}</p>
      <p class="details-descr">
      ${overview}
      </p>
      <p class="details-release">Realease Date : ${release_date} <br><br> Genres : ${genres_list}</p>
      <a href="${homepage}"class="details-homepage">Book Tickets <i class="fa-solid fa-rocket"></i></a>
      `;
      player.setAttribute("src", `https://youtube.com/embed/${key}`);
    });
  });
}
getDetails();

export async function getTrailer(movie_id) {
  const filter = `movie/${movie_id}/videos?`;
  const movies = await getData(filter);
  const trailer_key = movies.results.filter(({ type }) => type == "Trailer")[0]
    .key;
  if (!trailer_key) return;
  return trailer_key;
}



