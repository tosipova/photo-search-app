const searchFormEl = document.querySelector("#search-form")
const queryEl = document.querySelector("#query")
const mainContent = document.querySelector("#results")
const paginationEl = document.querySelector('#pagination');

const API_KEY = 'aoY1Nj_WIbaZG1De7H_D_Q_HOJvrsAqnBHufRc4Dv68';
const API_URL = 'https://api.unsplash.com/search/photos/'
const ORIENTATION = 'squarish';
const PER_PAGE = 1;

let currentPage = 1;
let query = '';
searchFormEl.defaultValue = ""
queryEl.focus()

//  if searchformEl is null then hide pagination
// where should it be?

// if query changed then 

// 3)  if we are on  currentPage the show currentPage;currentpage+1;currentPage+2

const submitFormCallback = (event) => {
    event.preventDefault();
    query = queryEl.value;
    currentPage = 1;

    console.log(JSON.stringify(queryEl))
    if (!query) {
        mainContent.innerHTML = ""
        paginationEl.classList.add('d-none');
    } else {
        paginationEl.classList.remove('d-none');
        fetchPhotos()
    }
}

const onPaginationClickCallback = (event) => {
    event.preventDefault();

    const paginationTextValue = event.target.innerText; // text of the clicked link
    const paginationEls = document.querySelectorAll('.page-item');

    // Make current page button not a link === Не делать запрос, если страница не изменилась
    if (Number(paginationTextValue) === currentPage) {
        return;
    };

    [...paginationEls].forEach(el => {
        el.classList.remove('active')
    })

    if (paginationTextValue === 'Previous') {
        currentPage--

        // Найти элемент .page-item со страницей currentPage--
        // Добавить .active

        const currentPageEl = [...paginationEls].find(el => {
            return el.textContent.includes(currentPage);
        });
        currentPageEl.classList.add('active');

    } else if (paginationTextValue === 'Next') {
        currentPage++

        const currentPageEl = [...paginationEls].find(el => {
            return el.textContent.includes(currentPage);
        });

        if (currentPageEl) {
            currentPageEl.classList.add('active');
        }
    }
    else {
        currentPage = Number(paginationTextValue);
        event.target.parentNode.classList.add('active');
    }

    // Где мы находимся прямо сейчас?
    // currentPage = 1
    // Как понять что мы хотим перейти назад?
    // console.log(event.target.innerText);
    // Как получить страницу на которую мы хотим перейти?
    // currentPage = currentPage - 1
    // currentPage -= 1
    // currentPage

    fetchPhotos();
}

searchFormEl.addEventListener("submit", submitFormCallback);
paginationEl.addEventListener("click", onPaginationClickCallback);

function fetchPhotos() {
    const preFixUrl = `${API_URL}?client_id=${API_KEY}&query=${query}&orientation=${ORIENTATION}`;
    const fullApiUrl = `${preFixUrl}&per_page=${PER_PAGE}&page=${currentPage}`;

    fetch(fullApiUrl)
        .then(response => response.json())
        .then(({ results: cards, total_pages: totalPages }) => {

            const firstPageEl = document.querySelector("#first-page")
            const nextPageEl = document.querySelector("#next-page")
            const totalPagesEl = document.querySelector("#total-pages"); // null || el
       
            if (!totalPagesEl) { // !null => true || !el => false
                console.log("generating last page")
                paginationEl.insertAdjacentHTML('beforeend', `
                <li>
                    ...
                </li>
                <li class="page-item" id="total-pages">
                    <a class="page-link" href="#">${totalPages}</a>
                </li>
            `)
            } else {

                totalPagesEl.innerHTML = `<a class="page-link" href="#">${totalPages}</a>`
            }

            if (totalPages === currentPage) {
                nextPageEl.classList.add('d-none');
            } else {
                nextPageEl.classList.remove('d-none');
            }

            if (currentPage === 1) {
                firstPageEl.classList.add('d-none')
            } else {
                firstPageEl.classList.remove('d-none')
            }

            mainContent.innerHTML = ""
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

                // Boolean(card.description)
                // Boolean(null) => false
                // Boolean('Cat') => true
                if (card.description) {
                    cardBody.appendChild(title)
                }

                cardBody.appendChild(description)
                mainContent.appendChild(parent)
            });

        });
}