// VASCO JS

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
const getPlaylist = async () => {
  const workingPlaylists = [
    "13",
    "12",
    "14",
    "5",
    "25",
    "24",
    "28",
    "37",
    "46",
    "13",
    "76",
    "465",
    "271",
    "483",
    "45",
    "335",
    "68",
    "58",
    "36",
    "326",
    "310",
    "241",
    "430",
  ];

  const id = getRandomElement(workingPlaylists);

  console.log(id);
  // const id = 76;

  const url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + id;

  const options = {
    method: "GET",
    body: JSON.stringify(),

    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "0704e3122cmshbb05f15ef4f0571p1d5d41jsn006966e6ebea",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.debug(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

console.log(getPlaylist());

const createNewCard = async (playlist) => {
  // if (!playlist || !playlist.title || !playlist.picture_medium || !playlist.creator || !playlist.creator.name) {
  //   console.log("Error: Invalid playlist data");
  //   return;
  // }

  // const sequence = "https://e-cdns-images.dzcdn.net/images/cover//250x250-000000-80-0-0.jpg";
  // const regex = new RegExp(sequence);

  // if (regex.test(playlist.picture_medium)) {
  //   console.log(playlist);

  //   console.log("NO PICTURE");
  //   return;
  // }

  console.log(playlist);
  const playlistName = playlist.title;
  const playlistPicture = playlist.picture_medium;
  const playlistCreator = playlist.creator.name;
  const playlistEmptyValue = playlist.message;

  if (playlistEmptyValue != "no data") {
    const row = document.getElementById("row");

    const div = document.createElement("div");
    div.classList.add("col-sm-4", "col-md-3", "col-xxl-2");
    div.innerHTML = `
      <div class="card card-container playlist-card-container">
      <div class='d-flex flex-column align-items-center'>
      <img src="${playlistPicture}" class="card-img-top m-2 " alt="playlist cover" />
      </div>
      <div class="card-body ms-2 me-2 mb-2 d-block flex-column align-items-start">
        <h5 class="card-title text-white">${playlistName}</h5>
        <p class="card-text color-text">${playlistCreator}</p>
      </div>
    </div>
      `;
    row.appendChild(div);
    // } else {
    //   getPlaylist();
    //   createNewCard();
    // }
  }
};

const generateHomepagePlaylistCards = async () => {
  let cardElementsOnPage = document.querySelectorAll(".playlist-card-container");

  for (; cardElementsOnPage.length < 12; ) {
    const playlist = await getPlaylist();
    if (playlist) {
      createNewCard(playlist);
      cardElementsOnPage = document.querySelectorAll(".playlist-card-container");
    } else {
      console.log("Failed to fetch playlist data.");
      break;
    }
  }
};

const init = async () => {
  generateHomepagePlaylistCards();
  playlistLeft();
  getArtists();
  getRandomAlbum();
};

window.addEventListener("DOMContentLoaded", () => {
  init();
});

const getArtists = async function () {
  const artistIds2 = ["13", "4937383", "1288678", "1155242"];
  for (let i = 0; i < artistIds2.length; i++) {
    const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistIds2[i];

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

      const artistsZone = document.querySelector("#artistsZone");

      const div = document.createElement("div");
      div.classList.add("artistCard", "col-3");
      div.addEventListener("click", function () {
        window.location.href = "artist-page.html?artistId=" + result.id;
      });

      const circleImg = document.createElement("img");
      circleImg.classList.add("artistCircle");
      circleImg.src = result.picture_medium;

      const artistName = document.createElement("p");
      artistName.classList.add("artistName");
      artistName.innerText = result.name;

      const artistType = document.createElement("p");
      artistType.classList.add("artistType");
      artistType.innerText = result.type;

      div.appendChild(circleImg);
      div.appendChild(artistName);
      div.appendChild(artistType);
      artistsZone.appendChild(div);
    } catch (error) {
      console.error(error);
    }
  }
};

const getRandomAlbum = async () => {
  const albumIds = ["309377597", "262561252", "366633", "111562", "182992", "211834212", "173334792", "647112112"];

  let randomNumber = Math.floor(Math.random() * 3) + 1;

  const url = "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumIds[randomNumber];

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

    const albumName = document.querySelector("#albumName");
    albumName.innerText = result.title;
    const albumArtistName = document.querySelector("#albumArtistName");
    albumArtistName.innerText = result.artist.name;
    const albumImg = document.querySelector("#albumImg");
    albumImg.src = result.cover_medium;
  } catch (error) {
    console.error(error);
  }
};
