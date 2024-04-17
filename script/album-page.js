const getAlbum = async () => {
  const id = 532596942;
  const url = "https://striveschool-api.herokuapp.com/api/deezer/album/{id}";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9e9a3063f7mshd3357ce4ccc6a20p1eb45cjsn795bcad761c1",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayAlbum(result);
  } catch (error) {
    console.error(error);
  }
};


const displayAlbum = (albumData) => {
  const albumTitle = albumData.title;
  const artistName = albumData.artist.name
  const coverImage = albumData.cover_medium;
  const trackList = albumData.tracks.data;


document.getElementById('album-title').textContent = albumTitle;
document.getElementById('artist-name').textContent = artistName;
document.getElementById('album-cover').src = coverImage;

const trackListContainer = document.getElementById('track-list');
  trackList.forEach((track, index) => {
    const trackItem = document.createElement('div');
    trackItem.textContent = `${index + 1}. ${track.title}`;
    trackListContainer.appendChild(trackItem);
  });
};

window.onload = getAlbum;