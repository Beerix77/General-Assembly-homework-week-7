
// console.log('Hello AJAX!');
// console.log(axios);

//PROMISES: (.then)
//CBF = callback function

// GENERAL FORM: axios.get('URL').then(successCBF).catch(errorCBF);
//run 'axios.get', .then when data arrives, here is the 'function' that i want you to run to deal with the data.

// axios.get('http://www.numbersapi.com/42/')
//   .then(function(res) {
//     console.log('RES:', res); // 
//     console.log('RES.DATA:', res.data); // 

//     document.body.innerHTML += `
//       <p>
//         ${res.data}
// 			</p>`;

// 	}); // .then()



// // =================JSON======================
// axios.get('http://www.numbersapi.com/42/?json')
//   .then(function(res) {
//     console.log('RES:', res); // 
//     console.log('RES.DATA:', res.data); 

// 		document.body.innerHTML += `
// 			<h2>${res.data.number}</h2>
//       <p>
//         ${res.data.text}
// 			</p>`; 

// 	}); // .then()


const formData = document.querySelector('#numberForm');
const userNum = document.querySelector('#userNumber'); //actual data from form is 'userNum.value'
const outputDiv = document.querySelector('#output');


formData.addEventListener('submit', (ev) => {
	
	ev.preventDefault();

	console.log('USER INPUT:', userNum.value);

	axios.get(`http://www.numbersapi.com/${userNum.value}/?json`)
		.then(function(res) {

			console.log('RES.DATA:', res.data); // 

			outputDiv.innerHTML += `
				<h2>${res.data.number}</h2>
				<p>
					${res.data.text}
				</p>`; 
		
		}); // .then()

}); //end of numberForm.addEventLIstener


// "https://api.themoviedb.org/3/search/movie?api_key=24d863d54c86392e6e1df55b9a328755&query=alien"




























