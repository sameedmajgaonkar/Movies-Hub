import getData from  "../src/data.js";

async function getTrailer(movie_id) {
  const filter = `movie/${movie_id}/videos?`;
  const movies = await getData(filter);
  const trailer_key = movies.results.filter(({ type }) => type == "Trailer")[0]
    .key;
  if (!trailer_key) return;
  return trailer_key;
}

async function getDetails() {
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
export default getDetails