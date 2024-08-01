import showData from "../src/showData.js"
import getDetails from "../src/getDetails.js"
const search_input = document.querySelector("#search")
search_input.addEventListener("input",async ()=>{
    const filter = `search/movie?query=${search_input.value}&`
        await showData(filter)
        await getDetails()
})