
const containerItems = document.querySelector(".container-itens");
const btnNextSkinGoal = document.querySelector(".new-skin-button")
let weaponsListTest = [{
    weaponLink: "#",
    weaponName: "AWP",
    skinLink: "#",
    skinName: "Gungnir",
    weaponImg: "./src/img/awp-g.png",
    weaponPrice: "R$ 5.000,00 - R$ 6.500",
    weaponPriceStattrack: "R$ 8.500 - R$ 11.500",
    weaponCollection: "The Norse Collection",
    inspectInGameLink: "#"
},
]

function createCard(weaponLink, weaponName, skinLink, skinName, weaponImg, weaponPrice, weaponPriceStattrack, weaponCollection, inspectInGameLink){
const html = `<div class="card-item">
    <h3>
        <a href="${weaponLink}">${weaponName} | </a>
        <a href="${skinLink}">${skinName}</a>
    </h3>
    <div class="stattrack">
            <p>StatTrack</p>
    </div>
    <a>
    <img src="${weaponImg}">
    </a>
    <div class="price">
        <p>${weaponPrice}</p>
        <p>${weaponPriceStattrack}</p>
    </div>
    <div class="collection">
        <p>${weaponCollection}</p>
    </div>
    <div class="btn-inspect">
    <p><a  class="text-btn-inspect" href="${inspectInGameLink}">Inspect in game</a></p>
    <p><a  class="text-btn-inspect" href="#">Steam linking</a></p>
    </div>
</div>`
return html;
}

console.log(btnNextSkinGoal)
btnNextSkinGoal.addEventListener("click", () =>{
    localStorage.setItem("weaponList",JSON.stringify(weaponsListTest))
    //adiciona novo item no array
    //no caso é só um teste, mas a ideia é fazer isso pegando as informações dos inputs
    const newItem = {
        weaponLink: "#",
        weaponName: "AK-47",
        skinLink: "#",
        skinName: "Fire-Serpent",
        weaponImg: "./src/img/awp-g.png",
        weaponPrice: "R$ 3.500,00 - R$ 4.500",
        weaponPriceStattrack: "R$ 6.500 - R$ 7.500",
        weaponCollection: weaponsListTest.length,
        inspectInGameLink: "#"
    }
    weaponsListTest.push(newItem)
    renderItem(newItem)
})

function renderItem(weapon){
    localStorage.setItem("weaponList",JSON.stringify(weaponsListTest))
    const insertItem = createCard(
        weapon.weaponLink,
        weapon.weaponName,
        weapon.skinLink,
        weapon.skinName,
        weapon.weaponImg,
        weapon.weaponPrice,
        weapon.weaponPriceStattrack,
        weapon.weaponCollection,
        weapon.inspectInGameLink);
    containerItems.insertAdjacentHTML('beforeEnd', insertItem);
}

if(JSON.parse(localStorage.getItem('weaponList'))){
    weaponsListTest = JSON.parse(localStorage.getItem('weaponList'))
}

weaponsListTest.forEach((weapon) => {
    renderItem(weapon)
})




// async function getPrice(weaponName, skinName) {
//     let url = `https://steamcommunity.com/market/priceoverview/?country=BR&currency=7&appid=730&market_hash_name=${weaponName}%20%7C%20${skinName}%20(Minimal%20Wear)`;
//     let obj = null;
    
//     try {
//         obj = await (await fetch(url)).json();
//     } catch(e) {
//         console.log('error');
//     }
    
//     console.log(obj);
// }

// getPrice(weaponsListTest[0].weaponName, weaponsListTest[0].skinName)

//237|GQbbdWPZmMmjZiUUT7oFIkfYsTJ4SHXAte5Eny8g

// https://steamcommunity.com/market/priceoverview/?country=BR&currency=7&appid=730&market_hash_name=P250%20%7C%20Asiimov%20(Minimal%20Wear)