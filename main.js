let movieNameReference = document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result');

// OMDB API key
key = "37467f24";

// Fetch data from API

let getMovie = () => {
    let movieName = movieNameReference.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    // If Empty input field
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please Enter a Movie Name</h3>`
    } 
    // If input is not empty
    else {
        fetch(url)
            .then((resp) => {
                return resp.json();
                })
            .then((data) => {
                console.log(data)
                console.log(data.Poster)
                console.log(data.Title)
                console.log(data.imdbRating)
                console.log(data.Rated)
                console.log(data.Year)
                console.log(data.Runtime)
                console.log(data.Genre)
                console.log(data.Actors)
                console.log(data.Director)

                // If movie exists in db
                if(data.Response == 'True') {
                    result.innerHTML = 
                        `<div class="info">
                            <img src='${data.Poster}' class='poster'>
                            <div>
                                <h2>${data.Title}</h2>
                                <div class='rating'>
                                    <img src="./img/star-icon.svg">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class='details'>
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class='genre'>
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                        <h3>Director:</h3>
                        <p>${data.Director}</p>
                        `;
                }
                // If movie doesn't exist in db
                else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            // If error
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured </h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
