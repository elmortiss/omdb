const API_KEY = 'fd58e48d';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const form = document.forms.search_form;
const details = document.getElementById("more_info");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = form.title.value.trim();
    const movieType = form.radio.value;
    
   
    if (!value) {
        form.title.classList.add('error');
        setVisibility(form.querySelector('.error-message'), true);
    } else {
        fetch(`${URL}&s=${value}&type=${movieType}`)
            .then(response => response.json())
            .then(data => generateResultCards(data))
        form.title.classList.remove('error');
        setVisibility(form.querySelector('.error-message'), false);
    } 
});


function setVisibility(element, isVisible) {
    isVisible ?
        element.classList.add('visible1') :
        element.classList.remove('visible');
}
function generateResultCards(data) {
    const search = data.Search;
    const  result = search.map(item => 
          `
          <div class="card border-primary mb-3" style="max-width: 20rem;">
                    <img class="card-img-top" src="${item.Poster}">
                    <div class="card-body">
                    <h5 class="card-title">${item.Title}</h5>
                    <p class="card-text">${item.Type}</p>
                    <button type="button" class="btn btn-primary more-info" data-toggle="modal" data-target="#movie-details" data-imdbID="${item.imdbID}">More info</button>
                    </div>
              </div>
    `).join('');
    
   document.querySelector('#card.result').innerHTML = result;
   initMoreInfoEventListeners()
}

function initMoreInfoEventListeners(){
    var buttons = document.querySelectorAll('.more-info');
    console.log(buttons)
    for (var i=0; i <= buttons.length; i++){
    var button = buttons[i];
    button && button.addEventListener('click', (event) => {
        event.preventDefault();
        const imdbID = event.target.getAttribute('data-imdbID');
            fetch(`${URL}&i=${imdbID}`)
  .then(response => response.json())
  .then(data => showMovieDetails(data));
     
        
})}}


function showMovieDetails(data){
    console.log(data);
    const movieDetailsHtml = 
    ` 
     <div class="row">
    <div class="col-md-4">
      <img src="${data.Poster}">
    </div>
    <div class="col-md-8">
      <h2>${data.Title}</h2>
      <ul class="list-group">
        <li class="list-group-item"><strong>Genre:</strong> ${data.Genre}</li>
        <li class="list-group-item"><strong>Released:</strong> ${data.Released}</li>
        <li class="list-group-item"><strong>Rated:</strong> ${data.Rated}</li>
        <li class="list-group-item"><strong>IMDB Rating:</strong> ${data.imdbRating}</li>
        <li class="list-group-item"><strong>Director:</strong> ${data.Director}</li>
        <li class="list-group-item"><strong>Writer:</strong> ${data.Writer}</li>
        <li class="list-group-item"><strong>Actors:</strong> ${data.Actors}</li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div >
      <h3>Plot</h3>
      ${data.Plot}
      <hr>
      <a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" class="btn btn-default">Go Back To Search</a>
    </div>
  </div>
  
 `
   document.querySelector('#movie-details').innerHTML = movieDetailsHtml;
   setVisibility(document.querySelector('#movie-details'), false);

  
 }

 
 function showPagination (){
     
 }