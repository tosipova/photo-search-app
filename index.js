// get Event submit form
// send server request
// render res in html






const searchFormEl = document.querySelector("#search-form")
const queryEl = document.querySelector("#query")
const contentEl = document.querySelector("#result")



const eventCallback = event => {
    event.preventDefault();

    const query = queryEl.value;


    fetch(`https://api.unsplash.com/search/photos/?client_id=aoY1Nj_WIbaZG1De7H_D_Q_HOJvrsAqnBHufRc4Dv68&query=${query}`)
        .then(response => response.json())
        .then(json => {

          const  description = json.results[0].description
          const  thumbUrl = json.results[0].urls.thumb

          console.log(description, thumbUrl)

          // contentEl

          // create el for description
          // add description
          // render description

          
          // create el for image
          // add image
          // render image

          const image = document.createElement("img")
          image.src = thumbUrl
          
          contentEl.appendChild(image)
        })
};
searchFormEl.addEventListener("submit", eventCallback);


