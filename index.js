// add your code here
document.querySelector("form").addEventListener("submit", addMovie);

function addMovie(e) {
    e.preventDefault();

    let title = document.getElementById("title");
    let poster = document.getElementById("poster");
    let plot = document.getElementById("plot");

    const movieObject = {
        Title: title.value,
        Poster: poster.value,
        Plot: plot.value
    };

    console.log(movieObject);

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(movieObject)
    })
    .then(response => response.json())
    .then(object => {
        addMovies(object); // Optionally add the movie to the DOM immediately
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function addMovies(movie){
    const row = document.getElementById("card")
    const div = document.createElement("div")
    div.classList.add("col-3")
    div.innerHTML =`<div class="card">
    <img src="${movie.Poster}" class="card-img-top" alt="card image cap" height="300px">
    <div class="card-body">
      <h5 class="card-title">${movie.Title}</h5>
      <p class="card-text">${movie.Plot}</p>
     <button> <a href="#" class="btn btn-outline-danger">Delete</a></button>
    </div>
  </div>`

row.appendChild(div)
div.querySelector("button").addEventListener("click",function(){
  div.remove()
  deleteData(movie.id);
})
function deleteData(id){
  fetch(`http://localhost:3000/movies/${id}`,{
    method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            
        }
  })
}


}
function getMovies(movie){
fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(movies=>{
        movies.forEach(addMovies);
    })
}

    document.addEventListener('DOMContentLoaded',function(){
        getMovies();
    
    })





