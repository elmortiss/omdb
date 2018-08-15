const API_KEY = 'fd58e48d';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const form = document.forms.search_form;
let page = 1;
const quant = 10;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = form.title.value.trim();
    const movieType = form.radio.value;
    page = 1;
   
    if (!value) {
        form.title.classList.add('error');
        setVisibility(form.querySelector('.error-message'), true);
    } else {
        fetch(`${URL}&s=${value}&type=${movieType}&page=${page}`)
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
    const total = data.totalResults;
    const  result = search.map(item => 
          `
          <div class="card border-primary mb-3" style="max-width: 20rem;">
                    <img class="card-img-top" src="${item.Poster}" onerror="this.src = 'https://www.film.ru/images/empty/260x400.png'">
                    <div class="card-body">
                    <h5 class="card-title">${item.Title}</h5>
                    <p class="card-text">${item.Type}</p>
                    <button type="button" class="btn btn-primary more-info" data-toggle="modal" data-target="#movie_details" data-imdbID="${item.imdbID}">More info</button>
                    </div>
              </div>
    `).join('');
   document.querySelector('#card.result').innerHTML = result;

   renderPagination(total)
   initMoreInfoEventListeners();

   
}


function initMoreInfoEventListeners(){
    var buttons = document.querySelectorAll('.more-info');
    for (var i=0; i <= buttons.length; i++){
    var button = buttons[i];
    button && button.addEventListener('click', (event) => {
        event.preventDefault();
        const imdbID = event.target.getAttribute('data-imdbID');
      fetch(`${URL}&i=${imdbID}&plot=full`)
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
    <div class="col-md-6">
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
  <div class="modal-dialog" role="document">
      <h3>Plot</h3>
      ${data.Plot}
      <hr>
      <a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
  </div>
  
 `
 document.querySelector('#movie_details').innerHTML = movieDetailsHtml; 

 

    }


    function renderPagination(total) {
        let pageQ = Math.ceil(total/quant);
        const pageButtonsArray = [];
        
        for (let i = 1; i <= pageQ; i++) {
            pageButtonsArray.push(`<li class="page-item"><a class="page-link" href="${i}">${i}</a></li>`)
        }
        const resultString = `

        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
               
                ${pageButtonsArray.join('')}
            
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>`;
        paginationContainer.innerHTML = resultString;
        paginationContainer.querySelectorAll('li a').forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                const index = item.getAttribute('href');
                page = index;
                
                
            });
        });    
    }    


   