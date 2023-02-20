const APIKEY = "9cf5e5c91b5056eadafdd94f4d14446f";
let imagesData;
let genreLookup = {};

//Fetch the genre list
const fetchGenres = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`);
      const genres = response.data.genres;
      genreLookup = genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
    } catch(error) {
      console.log(error);
      alert("There was an error", error);
    }
  }

//Fetch movie info for home page
const fetchTrending = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}`);
        return response.data;
    } catch(error) {
        console.log(error);
        alert("There was an error", error);
    }
}

//Fetch movie info for searching
const fetchByKeyword = async () => {

    const keyword = document.getElementById('searched-keyword').value;

    // Fix the search bar, when you search for soimething remove it as well.
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${keyword}`);
        const data = response.data;
        document.getElementById('searched-keyword').value = ''; // Clear the search input value
        return data;
    } catch(error) {
        console.log(error);
        alert("There was an error", error);
    }
}

//Get data we want by fetching genres and trending movie for home page
async function getMovie() {
    await fetchGenres(); // Fetch genre data first
    const { results } = await fetchTrending();
    imagesData = results.map((object) => {
        return {
            url: object.poster_path,
            title: object.title,
            released_year: object.release_date,
            description: object.overview || "Random Description",
            genre: object.genre_ids

        }
    });

    generateUI(imagesData);
}

//Get data we want by fetching genres and related by searching keyword
async function getMovieByKeyword() {
    const { results } = await fetchByKeyword();

    imagesData = results.map((object) => {
        return {
            url: object.poster_path,
            title: object.title,
            released_year: object.release_date,
            description: object.overview || "Random Description",
            genre: object.genre_ids

        }
    });

    generateUI(imagesData);
}

//Modify released_date to show year only
function modifyDate(release_date) {
    const year = (new Date(release_date)).getFullYear();
    return year;
}

//Modify the img path
function modifyPosterPath(poster_path){
    const imgPath = "https://image.tmdb.org/t/p/original/"
    poster_path = imgPath + poster_path;
    return poster_path;
}

//Generate UI
const generateUI = (arrayOfImages) => {
    let photoSection = document.getElementById('photo-section');
    photoSection.innerHTML = "";
  
    arrayOfImages.forEach((object) => {
      let imageContainer = document.createElement('div');
  
      const genreNames = object.genre.map(id => genreLookup[id]).join(', ');
  
      imageContainer.innerHTML = `
        <img src=${modifyPosterPath(object.url)}>
        <p><strong>Title:</strong> ${object.title}</p>
        <time><strong>Released Year:</strong> ${ modifyDate(object.released_year) }</time>
        <p><strong>Description:</strong> ${object.description}</p>
        <p><strong>Genre:</strong> ${genreNames}</p>
      `
      photoSection.appendChild(imageContainer);
    })
  }

getMovie();