let allMovies = [];

class Movie {
  constructor(title, rating, haveWatched, poster) {
    this.title = title;
    this.rating = rating;
    this.haveWatched = haveWatched;
    this.poster = poster;
  }
}

function addMovie(movie, poster) {
  movie.poster = poster;
  allMovies.push(movie);
  console.log("----------------");
  console.log("A new movie is added");
  saveMoviesToLocalStorage(allMovies); // Save the updated movie list
  printMovies(); // Display the updated movie list
}

function convertImageToBase64(image) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
  return canvas.toDataURL("image/png");
}

function printMovies() {
    const outputDiv = document.getElementById("movie-list");
    outputDiv.innerHTML = "<p> Movie List</p> <br/>";
  
    if (allMovies.length === 0) {
      outputDiv.innerHTML += "<p>No movies added yet.</p>";
    } else {
      allMovies.forEach((movie, index) => {
        const movieInfo = document.createElement("div");
        movieInfo.className = "movie-info";
  
        // Convert the Base64 poster back to an image
        const posterImage = new Image();
        posterImage.src = movie.poster;
  
        movieInfo.innerHTML = `
          <img src="${posterImage.src}" alt="${movie.title} Poster" width="150" height="200">
          <strong>Title:</strong> ${movie.title} <br>
          <strong>Rating:</strong> ${movie.rating} <br>
          <strong>Watched:</strong> ${movie.haveWatched ? "Yes" : "No"} <br>
          <button onclick="changeWatched('${movie.title}')">Toggle Watched</button>
          <button onclick="deleteMovie(${index})">Delete</button>
        `;
  
        outputDiv.appendChild(movieInfo);
      });
    }
    document.getElementById("total-movies").innerHTML = `<p>Total number of movies: ${allMovies.length}</p>`;
}

function deleteMovie(index) {
  if (index >= 0 && index < allMovies.length) {
    allMovies.splice(index, 1);
    saveMoviesToLocalStorage(allMovies);
    printMovies();
    console.log("----------------");
    console.log("A movie is deleted");
  }
}

function highRatings(rating) {
  const outputDiv = document.getElementById("movie-list");
  outputDiv.innerHTML = "<h2>High-Rated Movies</h2>";

  if (rating === "") {
    printMovies(); // Display all movies if the input is empty
    return;
  }

  rating = parseFloat(rating);

  const highRatedMovies = allMovies.filter((movie) => movie.rating > rating);

  if (highRatedMovies.length === 0) {
    outputDiv.innerHTML += `<p>No movies with a rating higher than ${rating}.</p>`;
  } else {
    highRatedMovies.forEach((movie) => {
      // Display high-rated movies
    });

    console.log("----------------");
    console.log("Printing movies with a rating higher than " + rating);
    highRatedMovies.forEach((movie) => {
      console.log(`${movie.title} has a rating of ${movie.rating}`);
    });
    console.log(`In total, there are ${highRatedMovies.length} matches`);
  }
}

document.getElementById("filter-button").addEventListener("click", function (event) {
  event.preventDefault();

  const ratingFilter = document.getElementById("rating-filter").value;
  highRatings(ratingFilter);
});

function changeWatched(title) {
  const movie = allMovies.find((movie) => movie.title === title);
  if (movie) {
    movie.haveWatched = !movie.haveWatched;
    printMovies();
    console.log("----------------");
    console.log("Changing the status of the movie...");
    saveMoviesToLocalStorage(allMovies); // Save the updated movie list
  }
}

document.getElementById("add-movie-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const rating = parseFloat(document.getElementById("rating").value);
  const haveWatched = document.getElementById("watched").checked;
  const posterInput = document.getElementById("poster");
  const posterFile = posterInput.files[0];

  if (!title || isNaN(rating)) {
    alert("Please enter a title and a valid rating.");
    return;
  }

  if (!posterFile) {
    alert("Please upload a movie poster.");
    return;
  }

  const posterURL = URL.createObjectURL(posterFile);

  const movie = new Movie(title, rating, haveWatched, posterURL);

  addMovie(movie, posterURL);
});

function saveMoviesToLocalStorage(movies) {
  localStorage.setItem('movies', JSON.stringify(movies));
}

function loadMoviesFromLocalStorage() {
  const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
  allMovies = savedMovies;
  printMovies();
}

loadMoviesFromLocalStorage();