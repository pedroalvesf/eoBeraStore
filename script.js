
const containerItens = document.querySelector(".container-first");

function createCard(weaponLink, weaponName, skinLink, skinName, weaponImg, weaponPrice, weaponPriceStattrack, weaponCollection, inspectInGameLink){
 `   <div class="card-item">
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
    <p><a href="${inspectInGameLink}">Inspect in game</a></p>
    <p><a href="#">ISteam linking</a></p>
    </div>
</div>`
}

//237|GQbbdWPZmMmjZiUUT7oFIkfYsTJ4SHXAte5Eny8g