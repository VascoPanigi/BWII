//CHIARA = playlist left section
const playlistLeft = async function () {
  let arrayPlaylistIds = ["13", "12", "14", "5", "25", "24", "28", "37", "46", "13"];
  const containerPlaylistLeft = document.querySelector(".playlist-container");
  for (let i = 0; i < arrayPlaylistIds.length; i++) {
    let url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrayPlaylistIds[i];
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
      let div = document.createElement("div");
      div.classList.add("d-flex", "align-items-center", "mb-3");

      let img = document.createElement("img");
      img.classList.add("imgPlaylistLeft");
      img.src = result.picture_small;

      let p = document.createElement("p");
      p.classList.add("mb-0");
      p.innerText = result.title;

      div.appendChild(img);
      div.appendChild(p);
      containerPlaylistLeft.appendChild(div);
    } catch (error) {
      console.error(error);
    }
  }
};

const closeRightBtn = document.querySelector("#closeRightSection");
closeRightBtn.addEventListener("click", function () {
  const rightSection = document.querySelector(".right-section");
  rightSection.classList.add("d-none");
  const mainSection = document.querySelector(".main-section");
  const leftSection = document.querySelector(".left-section");
  if (leftSection.classList.contains("col-1") && mainSection.classList.contains("col-9")) {
    mainSection.classList.remove("col-9");
    mainSection.classList.add("col-11");
  } else {
    mainSection.classList.remove("col-7");
    mainSection.classList.add("col-9");
  }
});

const closeLeftBtn = document.querySelector("#closeLeftSection");
closeLeftBtn.addEventListener("click", function () {
  const leftSection = document.querySelector(".left-section");
  const mainSection = document.querySelector(".main-section");
  const rightSection = document.querySelector(".right-section");

  if (rightSection.classList.contains("d-none")) {
    if (leftSection.classList.contains("col-3") && mainSection.classList.contains("col-9")) {
      leftSection.classList.remove("col-3");
      leftSection.classList.add("col-1");
      mainSection.classList.remove("col-9");
      mainSection.classList.add("col-11");
      const allParagraphs = document.querySelectorAll(".left-section p");
      for (let i = 0; i < allParagraphs.length; i++) {
        allParagraphs[i].classList.add("d-none");
      }
      leftSection.classList.add("align-items-center");
    } else {
      leftSection.classList.add("col-3");
      leftSection.classList.remove("col-1");
      mainSection.classList.add("col-9");
      mainSection.classList.remove("col-11");
      const allParagraphs = document.querySelectorAll(".left-section p");
      for (let i = 0; i < allParagraphs.length; i++) {
        allParagraphs[i].classList.remove("d-none");
      }
      leftSection.classList.remove("align-items-center");
    }
  } else {
    if (leftSection.classList.contains("col-3") && mainSection.classList.contains("col-7")) {
      leftSection.classList.remove("col-3");
      leftSection.classList.add("col-1");
      mainSection.classList.remove("col-7");
      mainSection.classList.add("col-9");
      const allParagraphs = document.querySelectorAll(".left-section p");
      for (let i = 0; i < allParagraphs.length; i++) {
        allParagraphs[i].classList.add("d-none");
      }
      leftSection.classList.add("align-items-center");
    } else {
      leftSection.classList.add("col-3");
      leftSection.classList.remove("col-1");
      mainSection.classList.add("col-7");
      mainSection.classList.remove("col-9");
      const allParagraphs = document.querySelectorAll(".left-section p");
      for (let i = 0; i < allParagraphs.length; i++) {
        allParagraphs[i].classList.remove("d-none");
      }
      leftSection.classList.remove("align-items-center");
    }
  }
});
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

    getTracks(result.id);
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
      timeTrack.innerText = result.data[i].duration + " seconds";

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
});
