
const containerItems = document.querySelector(".container-itens");
const btnNextSkinGoal = document.querySelector(".new-skin-button")
let data, pageActual

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
    console.log(data['items_list']['AWP | Electric Hive (Field-Tested)']);
    listItems(data['items_list'], 1, 10).forEach((weapon) => {
        renderItem(weapon)
    });
    createPagination()
}
getDb()

function createCard(weaponLink, weaponName, weaponImg, weaponPrice, weaponExterior, inspectInGameLink, weaponStatTrack) {
    const html = `<div class="card-item">
    <h3>
        <a href="${weaponLink}">${weaponName}</a>
    </h3>
    ${weaponStatTrack === 1 ?
            `<div class="stattrack">
    <p>StatTrack</p>
    </div>` : ''}
    <a>
    <img src="${weaponImg}">
    </a>
    <div class="price">
        <p>${weaponPrice}</p>
    </div>
    ${weaponExterior != 'undefined'? `<div class="exterior">
        <p>${weaponExterior}</p>
    </div>`: ''}
    <div class="btn-inspect">
    <p><a  class="text-btn-inspect" href="${inspectInGameLink}">Inspect in game</a></p>
    <p><a  class="text-btn-inspect" href="#">Steam linking</a></p>
    </div>
</div>`
    return html;
}

function renderItem(weapon) {
    localStorage.setItem("weaponList", JSON.stringify(weaponsList))
    try {
        containerItems.insertAdjacentHTML('beforeEnd', createCard(
        'weaponLink',
        weapon.name,
        `https://community.cloudflare.steamstatic.com/economy/image/${weapon.icon_url}`,
        `U$${weapon.price["7_days"].median != 'undefined'? weapon.price["7_days"].median : '0.00'}`,
        `${weapon.exterior}`,
        '',
        ''));
    } catch (error) {
        console.log(error)
    }
}

//pagination

function listItems(items, actualPage, limitItems) {
    pageActual = actualPage;
    console.log(pageActual, 'listItems')
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
        if(i === pageActual + 3) {
            html += `<li class="button page-next">></li>`
            html += `<li class="button page-next-plus">>></li>`
            html += `<li class="button page">${pageActual+40}</li>`
            continue;
        }
        html += `<li class="button page">${i}</li>`
    }
    pages.innerHTML = html;
}

pages.addEventListener('click', (e) => {
    if (e.target.classList.contains('page')) {
        containerItems.innerHTML = '';
        listItems(data['items_list'], Number(e.target.textContent), 10).forEach((weapon) => {
            renderItem(weapon)
        });
    }else if(e.target.classList.contains('page-next')) {
        containerItems.innerHTML = '';
        listItems(data['items_list'], pageActual + 1, 10).forEach((weapon) => {
            renderItem(weapon)
        });
    }else if(e.target.classList.contains('page-previous')&& pageActual > 1) {
        containerItems.innerHTML = '';
        listItems(data['items_list'], pageActual - 1, 10).forEach((weapon) => {
            renderItem(weapon)
        });
    }else if(e.target.classList.contains('page-next-plus')) {
        containerItems.innerHTML = '';
        listItems(data['items_list'], pageActual + 4, 10).forEach((weapon) => {
            renderItem(weapon)
        });
    }else if(e.target.classList.contains('page-previous-plus') && pageActual > 5) {
        containerItems.innerHTML = '';
        listItems(data['items_list'], pageActual - 4, 10).forEach((weapon) => {
            renderItem(weapon)
        });
    }
    createPagination()
})
