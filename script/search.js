const form = document.querySelector("form");
const inputField = document.getElementById("search-value");

const handleSubmit = (event) => {
  event.preventDefault();
  const searchValue = inputField.value;
  // console.log(searchValue)
};

// form.addEventListener('submit', handleSubmit)

//RATIO > l-utente digita un nome-per esempio eminem

//2 io quindi metto questo parametro nell-endpoint
//https://deezerdevs-deezer.p.rapidapi.com/search?q={query}

//3- genero una card per l-artista
//4- faccio il display di 5 canzoni
//5- tempo permettendo - faccio vedere album e playlist in basso

const getSearchResults = async () => {
  const query = form.addEventListener("submit", handleSubmit);

  const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + query;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0704e3122cmshbb05f15ef4f0571p1d5d41jsn006966e6ebea",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  getSearchResults();
});
