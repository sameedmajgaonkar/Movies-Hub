import getDetails from "../src/getDetails.js";
import showData from "../src/showData.js";
const filter = `trending/movie/day?language=en-US&`;

async  function getMovies(){
  await showData(filter)
  await getDetails()
}
getMovies()
console.log("clicked")