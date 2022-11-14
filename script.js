
const containerItens = document.querySelector(".container-first");

function createCard(){
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
        <p>Inspect in game</p>
        <p>Steam linking</p>
    </div>
</div>`
}