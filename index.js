const searchFormEl = document.querySelector("#search-form")
const queryEl = document.querySelector("#query")
const mainContent = document.querySelector("#result")


const eventCallback = event => {
    event.preventDefault();
    const query = queryEl.value;
    fetch(`https://api.unsplash.com/search/photos/?client_id=aoY1Nj_WIbaZG1De7H_D_Q_HOJvrsAqnBHufRc4Dv68&query=${query}&orientation=squarish`)
        .then(response => response.json())
        .then(json => {
            const cards = json.results.slice(0, 5);

            mainContent.innerHTML = ""
            queryEl.value = ""
        
            cards.forEach(card => {
                const parent = document.createElement("div")
                const title = document.createElement("div")
                const image = document.createElement("img")
                
                title.innerHTML = card.alt_description
                image.src = card.urls.thumb
                image.classList.add('img-thumbnail')

                parent.appendChild(title)
                parent.appendChild(image)
                mainContent.appendChild(parent)

            });

        })
};
searchFormEl.addEventListener("submit", eventCallback);


