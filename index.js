const searchFormEl = document.querySelector("#search-form")
const queryEl = document.querySelector("#query")
const contentEl = document.querySelector("#result")



const eventCallback = event => {
    event.preventDefault();

    const query = queryEl.value;


    fetch(`https://api.unsplash.com/search/photos/?client_id=aoY1Nj_WIbaZG1De7H_D_Q_HOJvrsAqnBHufRc4Dv68&query=${query}&orientation=squarish`)
        .then(response => response.json())
        .then(json => {

            contentEl.innerHTML = ""

            // Взять 5 карточек из json.results
            // Для каждой карточки создать разметку
            // Для каждой карточки разместить данные из json.results
            // Каждую карточку должны отобразить
            // Отобразить 5 карточек

            const cards = json.results.slice(0, 5);

            // for (let i = 0; i < cards.length; i++) {
            //     const thumbUrl = json.results[i].urls.thumb
            //     const image = document.createElement("img")
            //     image.src = thumbUrl
            //     contentEl.appendChild(image)
            // }

            cards.forEach(card => {
                const thumbUrl = card.urls.thumb
                // TODO: adddescription
                // const description = card.description
                const image = document.createElement("img")
                
                image.src = thumbUrl
                image.classList.add('img-thumbnail')
                

                contentEl.appendChild(image)
            });

            queryEl.value = ""
        })
};
searchFormEl.addEventListener("submit", eventCallback);


