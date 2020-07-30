const searchFormEl = document.querySelector("#search-form")
const queryEl = document.querySelector("#query")
const mainContent = document.querySelector("#results")


const API_KEY = 'aoY1Nj_WIbaZG1De7H_D_Q_HOJvrsAqnBHufRc4Dv68';
const API_URL = 'https://api.unsplash.com/search/photos/'
const ORIENTATION = 'squarish';
let perPage = 5;



const eventCallback = event => {
    event.preventDefault();
    const query = queryEl.value;
    const preFixUrl = `${API_URL}?client_id=${API_KEY}&query=${query}&orientation=${ORIENTATION}`
    const fullApiUrl = `${preFixUrl}&per_page=${perPage}`;
    searchFormEl.defaultValue = "dog"

    fetch(fullApiUrl)
        .then(response => response.json())
        .then(json => {
            const cards = json.results;
            console.log(cards)
            queryEl.value = ""

            cards.forEach(card => {
                const parent = document.createElement("div")
                const cardBody = document.createElement("div")
                const title = document.createElement("h5")
                const description = document.createElement("p")
                const image = document.createElement("img")

                description.innerHTML = card.alt_description
                title.innerHTML = card.description
                image.src = card.urls.thumb

                parent.classList.add('card')
                cardBody.classList.add('card-body')
                title.classList.add('card-title')
                description.classList.add('card-text')
                image.classList.add('card-img-top')

                parent.appendChild(cardBody)
                parent.appendChild(image)

                // Добавить только, если description
                cardBody.appendChild(title)

                cardBody.appendChild(description)
                mainContent.appendChild(parent)
            });

        })
};

searchFormEl.addEventListener("submit", eventCallback);


