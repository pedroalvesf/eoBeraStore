
const containerItems = document.querySelector(".container-itens");
const btnNextSkinGoal = document.querySelector(".new-skin-button")
let data

let weaponsList = [
    'AWP | Electric Hive (Field-Tested)',
    'USP-S | Printstream (Field-Tested)'
]
if(JSON.parse(localStorage.getItem('weaponList'))){
    weaponsList = JSON.parse(localStorage.getItem('weaponList'))
}

async function getDb() {
    const res = await fetch("./src/img/csgoitems.JSON");
    data = await res.json();
    console.log(data['items_list']['AWP | Electric Hive (Field-Tested)']);

    await weaponsList.forEach((weapon) => {
        console.log(weapon)
        renderItem(data['items_list'][weapon])
    })
}
getDb()

function createCard(weaponLink, weaponName, weaponImg, weaponPrice, weaponExterior, inspectInGameLink, weaponStatTrack){
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
    <div class="exterior">
        <p>${weaponExterior}</p>
    </div>
    <div class="btn-inspect">
    <p><a  class="text-btn-inspect" href="${inspectInGameLink}">Inspect in game</a></p>
    <p><a  class="text-btn-inspect" href="#">Steam linking</a></p>
    </div>
</div>`
return html;
}

function renderItem(weapon){
    localStorage.setItem("weaponList",JSON.stringify(weaponsList))
    const insertItem = createCard(
        'weaponLink',
        weapon.name,
        `https://community.cloudflare.steamstatic.com/economy/image/${weapon.icon_url}`,
        `U$${weapon.price["7_days"].median}`,
        `${weapon.exterior}`,
        '',
        '');
    containerItems.insertAdjacentHTML('beforeEnd', insertItem);
}







// https://community.cloudflare.steamstatic.com/economy/image/${iconurl}