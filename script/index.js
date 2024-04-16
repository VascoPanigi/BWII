// const url = 'https://deezerdevs-deezer.p.rapidapi.com/infos';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '0704e3122cmshbb05f15ef4f0571p1d5d41jsn006966e6ebea',
// 		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

//PROCESSO:
//Voglio fetchare l'URL e voglio popolare la pagina di elementi card playlist
//TODO 1: fetchare il giusto API
//TODO 2: trovare i giusti attributi dell'ogetto da inserire come elementi nella pagina
//TODO 3: creare gli elementi nella pagina prima con innerHTML e in fase di rifinizione del
//codice sostutuire con dei create-classlist-append
//TODO 4: RANDOMIZZARE il fetch inserendo un math.random
//TODO 5: non impazzire

//TODO per giorno 2:
//spostare la funzione di fetch e renderla autonoma
//creare un fixed amount di card per pagina usando la funzione random
//controllare IF uno dei parametri (tipo la PICTURE) della playlist è vuoto
//questo significa che non c'è nessuna playlist in quell'API
//pescare un nuovo numero finché la playlist che esce non è popolata

const url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/76";
const row = document.getElementById("row");

//QUESTO CODICE QUI SOTTO FUNZIONA
window.addEventListener("DOMContentLoaded", async () => {
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
    createNewCard(result);
  } catch (error) {
    console.error(error);
  }
});

//QUESTA sarà la base di partenza della funzione (basata su una versione precedente del codice)

// const getPlaylist = async () => {
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
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };

const createNewCard = (playlist) => {
  const row = document.getElementById("row");

  const div = document.createElement("div");
  div.classList.add("col-md-3");
  div.innerHTML = `
    <div class="card card-container ">
    <div class='d-flex flex-column align-items-center'>
    <img src="${playlist.picture_medium}" class="card-img-top m-2 " alt="playlist cover" />
    </div>
    <div class="card-body ms-2 me-2 mb-2 d-block flex-column align-items-start">
      <h5 class="card-title text-white">${playlist.title}</h5>
      <p class="card-text color-text">${playlist.creator.name}</p>
    </div>
  </div>
    `;
  row.appendChild(div);
};
