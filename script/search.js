// //RATIO > l-utente digita un nome-per esempio eminem

// //2 io quindi metto questo parametro nell-endpoint
// //https://deezerdevs-deezer.p.rapidapi.com/search?q={query}

// //3- genero una card per l-artista
// //4- faccio il display di 5 canzoni
// //5- tempo permettendo - faccio vedere album e playlist in basso

const form = document.querySelector("form");
const inputField = document.getElementById("search-value");
const top5SongsContainer = document.getElementById("top-5-songs");
const artistCardContainer = document.querySelector(".artist-container");

const handleSubmit = async (event) => {
  event.preventDefault();

  const searchValue = inputField.value;

  if (!searchValue) {
    alert("Please enter a search term");
    return;
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0704e3122cmshbb05f15ef4f0571p1d5d41jsn006966e6ebea",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(newUrl(searchValue), options);
    const result = await response.json();
    createTop5SongsResult(result);
    createArtistCard(result);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const newUrl = (searchValue) => {
  const endpoint = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
  return `${endpoint}${searchValue}`;
};

form.addEventListener("submit", handleSubmit);

const createTop5SongsResult = async (obj) => {
  const ul = document.createElement("ul");
  ul.classList.add("list-group");
  top5SongsContainer.appendChild(ul);

  for (let i = 0; i < 5; i++) {
    const artist = obj.data[i].artist.name;
    const song_name = obj.data[i].title;
    const img = obj.data[i].album.cover_medium;
    const duration = obj.data[i].duration;
    console.log(artist, song_name, img, duration);
  }
};

const createArtistCard = async (obj) => {
  const name = obj.data[1].artist.name;
  const picture = obj.data[1].artist.picture_medium;
  const type = obj.data[1].artist.type;

  artistCardContainer.innerHTML = `<div class="d-flex justify-content-center mt-2 mb-2">
    <img src="${picture}" class="card-img-top" alt="${name}'s picture" />
  </div>
  <div class="card-body text-white p-2">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">
    ${type}
    </p>
  </div>`;
};

window.addEventListener("DOMContentLoaded", () => {});
