const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getAlbumData = async () => {
  const url = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;

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
    createSongs(result);
    createAlbumHeader(result);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

/* const createHeader = async (obj) =>{
  const artistHeader = document.getElementById("artist-header");

  const title = obj.title
  const image = obj.artist.picture_medium
  const artistName = obj.artist.name


  artistHeader.innerHTML = ``
} */

const createAlbumHeader = async (obj) => {
  // Creazione immagine album

  const header = document.getElementById("album-header");

  const image = obj.cover_medium;

  header.innerHTML = `<img src="${image}" class="img-fluid" alt="cover image" />`;

  //Creazione Testo Album + Artista

  const artistHeader = document.getElementById("artist-header");

  const title = obj.title;
  const artistImage = obj.artist.picture_medium;
  const artistName = obj.artist.name;
  const releaseDate = obj.release_date;

  const releaseYear = releaseDate.split("-")[0];
  console.log(releaseYear);

  const tracks = obj.nb_tracks;
  const duration = obj.duration;

  const durationInMins = Math.floor(parseInt(duration) / 60);
  console.log(durationInMins);

  artistHeader.innerHTML = `<div class="text-right">
                            <p class="album">ALBUM</p>
                            <h1 class="album-h1 fw-bolder">${title}</h1>
                            <img src="${artistImage}" alt="" width="20" height="20" class="me-3" />
                            <p class="d-inline">
                              <span class="fw-bold">${artistName} </span
                              ><span class="fw-light">• ${releaseYear} • ${tracks} brani, </span
                              ><span class="fw-light">${durationInMins} min</span>
                            </p>
                          </div>`;

  console.log();
};

const createSongs = async (obj) => {
  const row = document.getElementById("row");

  const tracks_array = obj.tracks.data;

  for (let i = 0; i < tracks_array.length; i++) {
    const div = document.createElement("div");
    div.classList.add("song-info", "track-container");
    const artist = obj.artist.name;
    const song_name = obj.tracks.data[i].title;
    const rank = obj.tracks.data[i].rank;
    const track_num = i + 1;
    const duration = obj.tracks.data[i].duration;
    const durationInMins = Math.floor(parseInt(duration) / 60);
    const remainingSeconds = parseInt(duration) % 60;

    div.innerHTML = `
    <div id="song-text" class="col d-flex justify-content-between text-white-50 text-end fw-light p-3">

    <div class="col text-start">${track_num}</div>
                          <div class="col">${artist} - ${song_name}</div>
                          <div class="col">${rank}</div>
                          <div class="col">${durationInMins}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}</div>
                          </div>
    `;

    console.log(song_name, rank);
    row.appendChild(div);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  getAlbumData();
  playlistLeft();
});
