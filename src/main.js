const API_KEY = 'fd58e48d';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const form = document.forms.search_form;

form.addEventListener('submit', (event) => {
    let page =1;
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


function setVisibility(element, isError) {
    isError ?
        element.classList.add('visible1') :
        element.classList.remove('visible');
}
function generateResultCards(data) {
    const search = data.Search;
    const  result = search.map(item => 
          `
                <div class="card" style="width: 18em;">
                    <img class="card-img-top" src="${item.Poster}">
                    <div class="card-body">
                    <h5 class="card-title">${item.Title}</h5>
                    <p class="card-text">${item.Type}</p>
                    <button class="btn btn-primary" id="more_info" >More info</button>
                    </div>
              </div>
    `).join('');
    
     return document.querySelector('#card.result').innerHTML = result;
              
}


    





    



    


    