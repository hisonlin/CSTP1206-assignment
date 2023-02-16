const APIKEY = "9cf5e5c91b5056eadafdd94f4d14446f";
let imagesData;


const fetchMarvel = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=marvel`);
        return response.data;
    } catch(error) {
        console.log(error);
        alert("There was an error", error);
    }
}

const fetchImageByKeyword = async () => {

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

const generateUI = (arrayOfImages) => {
    let photoSection = document.getElementById('photo-section');
    photoSection.innerHTML = "";

    arrayOfImages.forEach((object) => {
        let imageContainer = document.createElement('div');

        imageContainer.innerHTML = `
        <img src=${modifyPosterPath(object.url)}>
        <p><strong>Title:</strong> ${object.title}</p>
        <time><strong>Released Year:</strong> ${ modifyDate(object.released_year) }</time>
        <p><strong>Description:</strong> ${object.description}</p>
        <p><strong>Genre:</strong> ${object.genre}</p>
        `
        photoSection.appendChild(imageContainer);
    })

}

function modifyDate(release_date) {
    const year = (new Date(release_date)).getFullYear();
    return year;
}
function modifyPosterPath(poster_path){
    const imgPath = "https://image.tmdb.org/t/p/original/"
    poster_path = imgPath + poster_path;
    return poster_path;
}

async function getImageDataByKeyword() {
    const { results } = await fetchImageByKeyword();

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
 
async function getData() {
    const { results } = await fetchMarvel();
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
getData();