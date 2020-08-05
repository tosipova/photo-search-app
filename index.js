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
searchFormEl.defaultValue = "dog"


const submitFormCallback = event => {
    event.preventDefault();
    query = queryEl.value;
    currentPage = 1;

    fetchPhotos()
}

const onPaginationClickCallback = event => {
    event.preventDefault();
    const paginationEls = document.querySelectorAll('.page-item');
    // ['<li class="page-item active"><a class="page-link" href="#">1</a></li>',
    //  '<li class="page-item active"><a class="page-link" href="#">2</a></li>',
    //  '<li class="page-item active"><a class="page-link" href="#">3</a></li>']
    [...paginationEls].forEach(el => {
        el.classList.remove('active')
    })

    // event.target === <a class="page-link" href="#">2</a>
    currentPage = Number(event.target.innerText);
    event.target.parentNode.classList.add('active');
    // <li class="page-item active"><a class="page-link" href="#">2</a></li>
    fetchPhotos()


}

searchFormEl.addEventListener("submit", submitFormCallback);

paginationEl.addEventListener("click", onPaginationClickCallback);


function fetchPhotos() {
    const preFixUrl = `${API_URL}?client_id=${API_KEY}&query=${query}&orientation=${ORIENTATION}`;
    const fullApiUrl = `${preFixUrl}&per_page=${PER_PAGE}&page=${currentPage}`;


    fetch(fullApiUrl)
        .then(response => response.json())
        .then(({ results: cards, total_pages: totalPages }) => {

            // json.results;
            // json.total_pages

            // =>
            // const { results, total_pages } = json;
            // const cards = results;
            // const totalPages = total_pages;
            // cards,totalPages, results, total_pages

            // => 
            // const { results: cards, total_pages: totalPages } = json;
            // cards, totalPages

            // totalPages
            // <li class="page-item">
            //     <a class="page-link" href="#">3</a>
            // </li>


            // Add id to .page-item
            // Select element by id
            // Check if exists
            // => render

            // Add id to next -page
            // Select  next page by id
            // Compare total pages with current page ; true ( when total pages === current page) // false if otherwise
            // If true hide, if false is show

            const totalPagesEl = document.querySelector("#total-pages"); // null || el
            const nextPageEl = document.querySelector("#next-page")
            const firstPageEl = document.querySelector("#first-page")

            if (!totalPagesEl) { // !null => true || !el => false
                paginationEl.insertAdjacentHTML('beforeend', `
                <li>
                    ...
                </li>
                <li class="page-item" id="total-pages">
                    <a class="page-link" href="#">${totalPages}</a>
                </li>
            `)
            }

            if (totalPages === currentPage) {
                nextPageEl.classList.add('d-none');
            } else {
                nextPageEl.classList.remove('d-none');
            }
            if (currentPage === 1){
                firstPageEl.classList.add('d-none')
            } else {
                firstPageEl.classList.remove('d-none')
            }

            // 
            
            // add id previous el
            // select previouse page by id
            // if current page === 1 then true 
            //  if true then  hide element (with class) 


           

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