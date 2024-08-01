import showData from "../src/showData.js";
import getDetails from "../src/getDetails.js";
const filter = "movie/top_rated?";
async  function getMovies(){
    await showData(filter)
    await getDetails()
  }
  getMovies()