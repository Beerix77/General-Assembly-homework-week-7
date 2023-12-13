const locationDiv = document.querySelector('#location');
const astroDiv = document.querySelector('#astronauts');

const url_ISS = "http://api.open-notify.org/iss-now.json";
const url_astros = "http://api.open-notify.org/astros.json";



const getISS = function(){	
	axios.get(url_ISS)
	.then( (res) => {
		locationDiv.innerHTML = `<p>Latitude: ${res.data.iss_position.latitude}</p><p>Longitude: ${res.data.iss_position.longitude}</p> <hr/>`

	}) //.then
	.catch( (err) => {

		locationDiv.innerHTML = `Error locating ISS...${err}`

	}); //.catch
};


getISS();
setInterval(getISS, 5000);


axios.get(url_astros)
.then( (res) => {
	astroDiv.innerHTML = `<p>Number of Astonauts: ${res.data.number}</p>`
	for (let astro of res.data.people)
	astroDiv.innerHTML += `<p>Name: ${astro.name}, Craft: ${astro.craft}</p> <br/>`

	
}) //.then
.catch( (err) => {

	locationDiv.innerHTML = `Error locating Astronauts..${err}`

}); //.catch








