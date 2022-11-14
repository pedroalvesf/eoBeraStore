
const containerItens = document.querySelector(".container-itens");
const btnNextSkinGoal = document.querySelector(".new-skin-button")
const weaponsListTest = [{ 
    weaponLink: "#",
    weaponName: "AWP",
    skinLink: "#",
    skinName: "Gungnir",
    weaponImg: "./awp-g.png",
    weaponPrice: "R$ 5.000,00 - R$ 6.500",
    weaponPriceStattrack: "R$ 8.500 - R$ 11.500",
    weaponCollection: "The Norse Collection",
    inspectInGameLink: "#"
},
{ 
    weaponLink: "#",
    weaponName: "AK-47",
    skinLink: "#",
    skinName: "Fire-Serpent",
    weaponImg: "./awp-g.png",
    weaponPrice: "R$ 3.500,00 - R$ 4.500",
    weaponPriceStattrack: "R$ 6.500 - R$ 7.500",
    weaponCollection: "The Norse Collection",
    inspectInGameLink: "#"
}
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
    console.log(weaponsListTest)
    const insertItem = 
        createCard(
        weaponsListTest[0].weaponLink, 
        weaponsListTest[0].weaponName,
        weaponsListTest[0].skinLink, 
        weaponsListTest[0].skinName,
        weaponsListTest[0].weaponImg, 
        weaponsListTest[0].weaponPrice, 
        weaponsListTest[0].weaponPriceStattrack, 
        weaponsListTest[0].weaponCollection, 
        weaponsListTest[0].inspectInGameLink);
        containerItens.insertAdjacentHTML('beforeEnd', insertItem);
})


//237|GQbbdWPZmMmjZiUUT7oFIkfYsTJ4SHXAte5Eny8g

// https://steamcommunity.com/market/priceoverview/?country=BR&currency=7&appid=730&market_hash_name=P250%20%7C%20Asiimov%20(Minimal%20Wear)