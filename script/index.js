// VASCO JS
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

console.log(createNewCard());

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
};

window.addEventListener("DOMContentLoaded", () => {
  init();
});

// const workingPlaylists = [
//   "13",
//   "12",
//   "14",
//   "5",
//   "25",
//   "24",
//   "28",
//   "37",
//   "46",
//   "13",
//   "76",
//   "465",
//   "271",
//   "290",
//   "483",
//   "309",
//   "45",
//   "335",
//   "423",
//   "68",
//   "58",
//   "308",
//   "367",
//   "36",
//   "326",
//   "310",
//   "241",
//   "430",
// ];

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// const randomElement = getRandomElement(workingPlaylists);

// const getPlaylist = async () => {
//   const getRandomNumber = () => Math.floor(Math.random() * 500) + 1;

//   const id = getRandomNumber();
//   console.log(id);
//   // const id = 76;

//   const url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + id;

//   const options = {
//     method: "GET",
//     body: JSON.stringify(),

//     headers: {
//       "Content-Type": "application/json",
//       "X-RapidAPI-Key": "0704e3122cmshbb05f15ef4f0571p1d5d41jsn006966e6ebea",
//       "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// console.log(getPlaylist());

// const createNewCard = async (playlist) => {
//   if (!playlist || !playlist.title || !playlist.picture_medium || !playlist.creator || !playlist.creator.name) {
//     console.log("Error: Invalid playlist data");
//     return;
//   }

//   const sequence = "https://e-cdns-images.dzcdn.net/images/cover//250x250-000000-80-0-0.jpg";
//   const regex = new RegExp(sequence);

//   if (regex.test(playlist.picture_medium)) {
//     console.log(playlist);

//     console.log("NO PICTURE");
//     return;
//   }

//   console.log(playlist);
//   const playlistName = playlist.title;
//   const playlistPicture = playlist.picture_medium;
//   const playlistCreator = playlist.creator.name;
//   const playlistEmptyValue = playlist.message;

//   if (playlistEmptyValue != "no data") {
//     const row = document.getElementById("row");

//     const div = document.createElement("div");
//     div.classList.add("col-md-3", "col-sm-4", "col-xxl-2");
//     div.innerHTML = `
//       <div class="card card-container playlist-card-container">
//       <div class='d-flex flex-column align-items-center'>
//       <img src="${playlistPicture}" class="card-img-top m-2 " alt="playlist cover" />
//       </div>
//       <div class="card-body ms-2 me-2 mb-2 d-block flex-column align-items-start">
//         <h5 class="card-title text-white">${playlistName}</h5>
//         <p class="card-text color-text">${playlistCreator}</p>
//       </div>
//     </div>
//       `;
//     row.appendChild(div);
//   } else {
//     getPlaylist();
//     createNewCard();
//   }
// };

// console.log(createNewCard());

// const generateHomepagePlaylistCards = async () => {
//   let cardElementsOnPage = document.querySelectorAll(".playlist-card-container");

//   while (cardElementsOnPage.length < 12) {
//     const playlist = await getPlaylist();
//     if (playlist) {
//       createNewCard(playlist);
//       cardElementsOnPage = document.querySelectorAll(".playlist-card-container");
//     } else {
//       console.log("Failed to fetch playlist data.");
//       break;
//     }
//   }
// };

// const init = async () => {
//   generateHomepagePlaylistCards();
//   playlistLeft();
// };

// window.addEventListener("DOMContentLoaded", () => {
//   init();
// });

const albumTitle = document.querySelector(".card-album-title");

albumTitle.addEventListener("click", () => {
  window.location.assign("./album-page.html?id=" + 532596942);
});

// https://striveschool-api.herokuapp.com/api/deezer/album/{id}
