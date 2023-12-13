

const searchForm = document.querySelector('#searchForm');
const searchText = document.querySelector('#searchText'); //actual data from <Form> is 'searchText.value'
const resultsDiv = document.querySelector('#results');
const detailsDiv = document.querySelector('#details');


const API_KEY = "?api_key=24d863d54c86392e6e1df55b9a328755";
const MOVIE_POSTERS = "https://image.tmdb.org/t/p/w200/";
const MOVIE_POSTER_DETAILS = "https://image.tmdb.org/t/p/w500/";
const MOVIE_SEARCH = "https://api.themoviedb.org/3/search/movie";
const MOVIE_DETAILS = "https://api.themoviedb.org/3/movie/";

searchForm.addEventListener('submit', (ev) => {
	
	ev.preventDefault();

	console.log('USER INPUT:', searchText.value);

	const url = `${MOVIE_SEARCH}${API_KEY}&query=${searchText.value}`;

	axios.get(url)
		.then(function(res) {

			//console.log('RES.DATA:', res.data); 

			for( movie of res.data.results){

				console.log('MOVIE TITLE:', movie.title);
				console.log('MOVIE ID:', movie.id );

				resultsDiv.innerHTML += `
					<div class="movie">
						<img  src="${MOVIE_POSTERS}${movie.poster_path}" alt="NO POSTER FOR: ${movie.title}" data-id="${movie.id}" > 
					</div>
					`;

			}
		}) // .then()
		.catch(function(err) {

			console.warn('ERROR loading search results!!!', err);

			resultsDiv.innerHTML = 'There was an error in search...';

		}); // .catch()
		
}); //end of numberForm.addEventLIstener


// =========================================================================================================================================================

// want to use the 'id' to do another AJAX request
resultsDiv.addEventListener('click', (ev) => {   //ev is the response data.. then can delve deeper etc 'ev.xxxxx'

	//console.log('Click!', Math.random(), ev);
	if (ev.target.nodeName === 'IMG'){

		console.log('Target:', ev.target );

		resultsDiv.innerHTML = ''; // clear results
		searchForm.innerHTML = ''; // clear search form
	
		const url = `${MOVIE_DETAILS}${ev.target.dataset.id}${API_KEY}`;


		axios.get(url)
		.then(function(res) {

			console.log('RES.DATA:', res.data); 	
			console.log('MOVIE TITLE:', res.data.original_title);
			console.log('MOVIE OVERVIEW:', res.data.overview );

			detailsDiv.innerHTML += `
				<div class="movieDetails">
					<h1>${res.data.original_title}</h1>
					<img src="${MOVIE_POSTER_DETAILS}${res.data.poster_path}" alt="NO POSTER FOR: ${res.data.original_title}" > 
					<p>${res.data.overview}</p>
					<p>Runtime: ${res.data.runtime}mins</p>
					<p>Released: ${res.data.release_date}</p>
					<hr/>

				</div>
				`;
		}) // .then()
		.catch(function(err) {

			console.warn('ERROR loading details!!!', err);

			resultsDiv.innerHTML = 'There was an error loading details...';

		}); // .catch().

	} // end IF statement

}); // end of eventHandler 'click' on resultsDiv section ie results list (want IMG list eventually)


// URL STRUCTURE (reference):
// `https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="NO POSTER FOR: ${movie.title}` --> MOVIE IMAGE RESULTS
// `https://api.themoviedb.org/3/search/movie?api_key=24d863d54c86392e6e1df55b9a328755&query=alien` --> RESULTS
// `https://api.themoviedb.org/3/movie/1547?api_key=24d863d54c86392e6e1df55b9a328755` --> MOVIE DETAILS


