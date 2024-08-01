import {
  api_key,
  baseUrl,
  baseImageUrl,
  baseBackdropUrl,
} from "./api_config.js";

async function getData(
  filter = "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&"
) {
  const response = await fetch(`${baseUrl}${filter}${api_key}`);
  const data = await response.json();
  return data;
}

export default getData;
