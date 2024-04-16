const getPlaylist = async () => {
  const url = "https://deezerdevs-deezer.p.rapidapi.com/album/532596942";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9e9a3063f7mshd3357ce4ccc6a20p1eb45cjsn795bcad761c1",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
