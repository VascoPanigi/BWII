//funzione creazione pagina artista dinamica
const getArtist = async function (idArtist) {
  let url = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + idArtist;
  const options = {
    method: "GET",
    body: JSON.stringify(),

    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "4042446f72msh40e75764792e694p1172cejsn347ee411ee71",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    let imgBg = document.querySelector(".backgroundArtistImage");
    imgBg.style.backgroundImage = `url(${result.picture_xl})`;
    let h1 = document.querySelector(".artistName");
    h1.innerText = result.name;
    let monthlyListners = document.querySelector(".monthlyListners");
    monthlyListners.innerText = result.nb_fan + " ascoltatori mensili";
  } catch (error) {
    console.error(error);
  }
};

const getTracks = async function (artistId) {
  let url = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=10";
  const options = {
    method: "GET",
    body: JSON.stringify(),

    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "4042446f72msh40e75764792e694p1172cejsn347ee411ee71",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.data);
    let popularTracksContainer = document.querySelector(".popularTracks");
    for (let i = 0; i < result.data.length; i++) {
      let track = document.createElement("div");
      track.classList.add("track", "row");

      let div = document.createElement("div");
      div.classList.add("col-6", "d-flex", "align-items-center");

      let trackNumber = document.createElement("p");
      trackNumber.classList.add("trackNumber");
      trackNumber.innerText = i + 1;

      let img = document.createElement("img");
      img.classList.add("imgTrack");
      img.src = result.data[i].album.cover_small;

      let titleTrack = document.createElement("h5");
      titleTrack.classList.add("titleTrack", "m-0");
      titleTrack.innerText = result.data[i].title;

      let div2 = document.createElement("div");
      div2.classList.add("col-6", "d-flex", "justify-content-between");

      let rankTrack = document.createElement("p");
      rankTrack.classList.add("rankTrack");
      rankTrack.innerText = result.data[i].rank;

      let timeTrack = document.createElement("p");
      timeTrack.classList.add("timeTrack");

      const duration = result.data[i].duration;
      const min = Math.floor(duration / 60);
      const remainingSeconds = duration - min * 60;
      const formattedTime = min.toString().padStart(2, "0") + ":" + remainingSeconds.toString().padStart(2, "0");

      timeTrack.innerText = formattedTime;

      track.appendChild(div);
      div.appendChild(trackNumber);
      div.appendChild(img);
      div.appendChild(titleTrack);
      div2.appendChild(rankTrack);
      div2.appendChild(timeTrack);
      track.appendChild(div2);

      popularTracksContainer.appendChild(track);
    }
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  playlistLeft();
  let params = new URLSearchParams(document.location.search);
  let artistId = params.get("artistId");
  console.log(artistId);
  getArtist(artistId);
  getTracks(artistId);
});
