

// const API_URL = "https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1";
// const API_KEY = "api_key=2f5ac274ecfac5a455f38745704ad084";

// const URL = "https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=2f5ac274ecfac5a455f38745704ad084&text=vampire";

//let FULL_URL = `${API_URL}&${API_KEY}`;

//https://live.staticflickr.com/%7Bserver-id%7D/%7Bid%7D_%7Bsecret%7D_%7Bsize-suffix%7D.jpg
//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg



// things too get when submit a form:
//OBJECT within a variable. THe OBJECT contains a method with which when runs initialises certain KEY:VALUE pairs for the DOM
const flickrSearch = {

    config: {

        FLICKR_BASE_URL: `https://api.flickr.com/services/rest`,
        FLICKR_API_KEY: `2f5ac274ecfac5a455f38745704ad084`

    },




    //OBJECT (KEY: VALUE=OBJECT)
    dom: {},

    //METHOD:
    //initUI": function() {}   <-- (OLD WAY OF) KEY initUI: VALUE = function(){}
    initUI(){
        this.dom = {
            searchForm: document.querySelector('#searchForm'),
            searchText: document.querySelector('#searchText'),
            searchResults: document.querySelector('#results'),
            photoDetails: document.querySelector('#details'),

        };



        console.log(this.dom.searchForm);
        //console.log('this:', this);



        this.dom.searchForm.addEventListener('submit', (ev) => {
            //console.log(`Form submitted! ie BUTTON CLICKED`, Math.random());
            //console.log('Value submitted:', this.dom.searchText.value);

            ev.preventDefault(); // prevent form submit page reload
            this.loadSearchResults(this.dom.searchText.value); // run AJAX request function (loadSearchResults) with 'value submitted' as argument




        });// submit event

        this.dom.searchText.focus(); // after page loads cursor appears in form



        //we listen to 'click' events on the div#results parent element (clicking on a photo (add a dataset-id))
        //thus any child of this element (searcResults) (img are all CHILDREN of this) when we click we can run some code
        this.dom.searchResults.addEventListener('click', (ev) => {
            console.log(`img clicked`, ev.target.dataset.id);
            this.loadPhotoDetails(ev.target.dataset.id); //individual clicked photo details




        }); //eventListener CLICK

    
    }, //initUI()


  /////////////////////////////////////////////////////////////////////////


    loadSearchResults(searchText){

        console.log('search text value submitted:', searchText);


        //clear search results initial and clear the loading message
        this.dom.searchResults.replaceChildren();// clear any existing photos
        const loadingNode = document.createElement('p');
        loadingNode.innerHTML = "LOADING search results...";
        this.dom.searchResults.appendChild(loadingNode);
        
   
  
        //axios.get(`${this.config.FLICKR_BASE_URL}?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${this.config.FLICKR_API_KEY}&text=${searchText}`)
        
        axios.get(this.config.FLICKR_BASE_URL, {
            params: {
                method: 'flickr.photos.search',
                format: 'json',
                nojsoncallback: 1,
                api_key: this.config.FLICKR_API_KEY,
                text: searchText
            }
        })
        .then( res => {
            console.log(`RESULTS!!: `, res.data);
        //window.results = res.data;// debugging trick to create a global variable (TYPE IN CONSOLE)

            console.log('red.data.photos.photo: arg passed:', res.data.photos.photo);
            this.renderSearchResults(res.data.photos.photo);
            

        }) // .then()
        .catch( err => {
        console.log(`There was an error loading results:`, err);
        }); //.catch()
    }, // loadSearchResults() 



    renderSearchResults(photos){
        console.log(`in renderSearchResults`, photos);

        // this.dom.searchResults.innerHTML = ''; // clear any existing photos
        this.dom.searchResults.replaceChildren();// clear any existing photos


        for(const photo of photos){

            console.log(this.generateImageURL(photo));
            
            const imgNode = document.createElement('img');
            imgNode.src = this.generateImageURL(photo);
            imgNode.alt = photo.title;

            // dataset make a new att:
            // <img data-id="${photo.id)" src=...>
            imgNode.dataset.id = photo.id;   // new att added "data-id"


            //this.dom.searchResults is a DOM node we can append CHILD (img) to
            this.dom.searchResults.appendChild(imgNode);

        }
        

    }, //renderSearchResults



    generateImageURL(photo, size='q'){ // defaults to 'q' if not specified in arguments
        //console.log('photo to be given URL for', photo);
        return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    }, // generateImageURL(): returns URL of specific photo as a STRING



    loadPhotoDetails(chosenPhoto){
        console.log(`chosen photo:`, chosenPhoto);

        axios.get(this.config.FLICKR_BASE_URL, {
            params: {
                method: 'flickr.photos.getinfo',   //get info METHOD (different than search)
                photo_id: chosenPhoto,
                api_key: this.config.FLICKR_API_KEY,
                format: 'json',
                nojsoncallback: 1
            }
        })   
        .then( (res) => {
            console.log(`Details:`, res.data);
            this.renderPhotoDetails(res.data.photo)

        }) //.then()
        .catch( (err) => {
            console.warn(`There was an error loading details...`, err);
        }) //.catch()

    }, // loadPhotoDetails()




// 'h2' & 'img' will be CHILDREN of '<div="details"/>'
    renderPhotoDetails(photo){
        this.dom.searchResults.style.display = 'none';  //CSS hide photos NOT delete

        this.dom.photoDetails.style.display = 'block';  //CSS unhide photos
        this.dom.photoDetails.replaceChildren(); //clear

        const headingTag = document.createElement('h2');
        headingTag.innerHTML = photo.title._content;
        this.dom.photoDetails.appendChild(headingTag);

        const imgTag = document.createElement('img');
        imgTag.src = this.generateImageURL(photo, 'c'); // larger size 'c' LARGE
        imgTag.alt = photo.title._content;

        // add IMG to DOM
        this.dom.photoDetails.appendChild(imgTag);

        // ADD description, tags, Author etc
        




    }// renderPhotoDetails()

}; // flickrSearch OBJECT



flickrSearch.initUI(); //initialises ie the methods in the variable don't run automatically