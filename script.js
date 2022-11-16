
const containerItems = document.querySelector(".container-itens");
const search = document.querySelector("#search");

const containerMiddleFilter = document.querySelector(".filter-itens-middle");

const containerForm = document.querySelector(".container-modal");
const btnLogin = document.querySelector(".login");
const btnRegister = document.querySelector(".register")
const containerModal = document.querySelector(".container-modal")

const btnCloseForm = document.querySelector(".form-close-btn");

const usersCheckBox = document.querySelector("#privacy-policy")

let data, pageActual, itemsToShow = [];

let weaponsList = [
    'AWP | Electric Hive (Field-Tested)',
    'USP-S | Printstream (Field-Tested)'
]

if (JSON.parse(localStorage.getItem('weaponList'))) {
    weaponsList = JSON.parse(localStorage.getItem('weaponList'))
}

async function getDb() {
    const res = await fetch("./src/img/csgoitems.JSON");
    data = await res.json();
    itemsToShow = data['items_list'];
    listItems(itemsToShow, 1, 18).forEach((weapon) => {
        renderItem(weapon)
    });
    createPagination()
}
getDb()

function createCard(weaponLink, weaponName, weaponImg, weaponPrice, weaponExterior, weaponStatTrack) {
    const html = `<div class="card-item">
    <h3>
        <a href="${weaponLink}">${weaponName}</a>
    </h3>
    ${weaponStatTrack === 1 ?
            `<div class="stattrack">
    <p>StatTrack</p>
    </div>` : ''}
    <div class="container-weapon-image">
    <img src="${weaponImg}">
    </div>
    <div class="price">
        <p>${weaponPrice}</p>
    </div>
    ${weaponExterior != 'undefined'? `<div class="exterior">
        <p>${weaponExterior}</p>
    </div>`: ''}
</div>`
    return html;
}

function renderItem(weapon) {
    try {
        containerItems.insertAdjacentHTML('beforeEnd', createCard(
        'weaponLink',
        weapon.name,
        `https://community.cloudflare.steamstatic.com/economy/image/${weapon.icon_url}`,
        `U$${weapon.price["7_days"].median != 'undefined'? weapon.price["7_days"].median : '0.00'}`,
        `${weapon.exterior}`,
        weapon.stattrak
        ));
    } catch (error) {
        console.log(error)
    }
}

//pagination

function listItems(items, actualPage, limitItems) {
    pageActual = actualPage;
    let result = [];
    let totalPage = Math.ceil(Object.keys(items).length / limitItems);
    let count = (actualPage * limitItems) - limitItems;
    let delimiter = count + limitItems;
    if (actualPage <= totalPage) {
        for (let i = count; i < delimiter; i++) {
            if (items[Object.keys(items)[i]] != null) {
                result.push(items[Object.keys(items)[i]]);
            }
            count++;
        }
    }
    return result;
};


const pages = document.querySelector(".pages");


function createPagination() {
    let html = '';
    html += `<li class="button page-previous-plus ${pageActual < 4? 'unClick':''}"><<</li>`
    html += `<li class="button page-previous ${pageActual <= 1? 'unClick':''}"><</li>`
    for (let i = pageActual; i < pageActual + 4; i+=1) {
        html += `<li class="button page">${i}</li>`
    }
    html += `<li class="button page-next">></li>`
    html += `<li class="button page-next-plus">>></li>`
    html += `<li class="button page">${pageActual+40}</li>`
    pages.innerHTML = html;
}

pages.addEventListener('click', (e) => {
    if (e.target.classList.contains('page')) {
        containerItems.innerHTML = '';
        listItems(itemsToShow, Number(e.target.textContent), 18).forEach((weapon) => {
            renderItem(weapon)
        });
    }else if(e.target.classList.contains('page-next')) {
        containerItems.innerHTML = '';
        listItems(itemsToShow, pageActual + 1, 18).forEach((weapon) => {
            renderItem(weapon)
        });
    }else if(e.target.classList.contains('page-previous')&& pageActual > 1) {
        containerItems.innerHTML = '';
        listItems(itemsToShow, pageActual - 1, 18).forEach((weapon) => {
            renderItem(weapon)
        });
    }else if(e.target.classList.contains('page-next-plus')) {
        containerItems.innerHTML = '';
        listItems(itemsToShow, pageActual + 4, 18).forEach((weapon) => {
            renderItem(weapon)
        });
    }else if(e.target.classList.contains('page-previous-plus') && pageActual > 5) {
        containerItems.innerHTML = '';
        listItems(itemsToShow, pageActual - 4, 18).forEach((weapon) => {
            renderItem(weapon)
        });
    }
    createPagination()
    topFunction()
})

function filterObject(obj, callback) {
    return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => callback(val, key)));
}

function filterItems(){
    let itemsFiltered = []
    const searchValue = search.value.trim().toLowerCase();
    const filteredWeapons = filterObject(data['items_list'], (weapon) => {
        if(weapon.name.toLowerCase().includes(searchValue)) {
        return weapon;
        }
    })
    containerItems.innerHTML = '';
    Object.keys(filteredWeapons).forEach((weapon) => {
        itemsFiltered.push(data['items_list'][weapon])
    })
    listItems(itemsFiltered, 1, 18).forEach((weapon) => {
        renderItem(weapon)
    });
    return itemsFiltered;
}

search.addEventListener('keyup', () => {
    itemsToShow = filterItems()
    createPagination()
})

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function chooseItemFilter(event){
    search.value = event.target.textContent == "All"? '':event.target.textContent;
    itemsToShow = filterItems()
    createPagination()
}

containerMiddleFilter.addEventListener('click', chooseItemFilter);




// function openForm(classe){
//     const form = document.querySelector(classe)
//     form.classList.toggle("show");
// }


btnRegister.addEventListener('click', ()=>{
    containerModal.id = "showUp";
})

btnCloseForm.addEventListener('click', () =>{
    containerModal.id = "";
})








