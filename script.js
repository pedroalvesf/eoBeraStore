const containerItems = document.querySelector(".container-itens");
const cardItens = document.querySelectorAll(".card-item ");
const search = document.querySelector("#search");
const containerMiddleFilter = document.querySelector(".filter-itens-middle");
const btnLogin = document.querySelector(".login");
const btnRegister = document.querySelector(".register");
const containerModal = document.querySelector(".container-modal");
const containerModalItem = document.querySelector(".container-modal-item");
const btnCloseForm = document.querySelector(".form-close-btn");
const usersCheckBox = document.querySelector("#privacy-policy");
const btnCloseModalItem = document.querySelector(".form-close-modal");

let data,
  pageActual,
  inWhishList = false,
  itemsToShow = [];

let wishlist = [
  "AWP | Electric Hive (Field-Tested)",
  "USP-S | Printstream (Field-Tested)",
  "AK-47 | Baroque Purple (Battle-Scarred)",
];

if (JSON.parse(localStorage.getItem("wishlist"))) {
  wishlist = JSON.parse(localStorage.getItem("wishlist"));
}

async function getDb() {
  const res = await fetch("./src/img/csgoitems.JSON");
  data = await res.json();
  itemsToShow = data["items_list"];
  listItems(itemsToShow, 1, 18).forEach((weapon) => {
    renderItem(weapon);
  });
  createPagination();
  showCardModal();
}
getDb();

function createCard(
  weaponLink,
  weaponName,
  weaponImg,
  weaponPrice,
  weaponExterior,
  weaponStatTrack
) {
  const html = `<div class="card-item">
    <h3>
        <a class="card-item-title" href="${weaponLink}">${weaponName}</a>
    </h3>
    ${
      weaponStatTrack === 1
        ? `<div class="stattrack">
    <p>StatTrack</p>
    </div>`
        : ""
    }
    <div class="container-weapon-image">
    <img src="${weaponImg}">
    </div>
    <div class="price">
        <p>${weaponPrice}</p>
        <div class="heart ${
          wishlist.includes(weaponName.replace(/&#39/g, "'"))
            ? "choosenSkin"
            : ""
        }"> &hearts;</div>
    </div>
    ${
      weaponExterior != "undefined"
        ? `<div class="exterior">
        <p>${weaponExterior}</p>
    </div>`
        : ""
    }
</div>`;
  return html;
}

function renderItems () {
  containerItems.innerHTML = "";
  listItems(itemsToShow, 1, 18).forEach((weapon) => {
    renderItem(weapon);
  });
  createPagination();
}


function renderItem(weapon) {
    containerItems.insertAdjacentHTML(
      "beforeEnd",
      createCard(
        "weaponLink",
        weapon.name,
        `https://community.cloudflare.steamstatic.com/economy/image/${weapon.icon_url}`,
        `U$${
          weapon.price["7_days"] == null
            ? weapon.price["all_time"].median
            :  weapon.price["7_days"].median
        }`,
        `${weapon.exterior}`,
        weapon.stattrak
      )
    );
    addEventsHearts();
}

//pagination

function listItems(items, actualPage, limitItems) {
  pageActual = actualPage;
  let result = [];
  let totalPage = Math.ceil(Object.keys(items).length / limitItems);
  let count = actualPage * limitItems - limitItems;
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
}

const pages = document.querySelector(".pages");

function createPagination() {
  let html = "";
  html += `<li class="button page-previous-plus ${
    pageActual < 4 ? "unClick" : ""
  }"><<</li>`;
  html += `<li class="button page-previous ${
    pageActual <= 1 ? "unClick" : ""
  }"><</li>`;
  for (let i = pageActual; i < pageActual + 4; i += 1) {
    html += `<li class="button page">${i}</li>`;
  }
  html += `<li class="button page-next">></li>`;
  html += `<li class="button page-next-plus">>></li>`;
  html += `<li class="button page">${pageActual + 40}</li>`;
  pages.innerHTML = html;
  inWhishList = false;
}

pages.addEventListener("click", (e) => {
  if (e.target.classList.contains("page")) {
    containerItems.innerHTML = "";
    listItems(itemsToShow, Number(e.target.textContent), 18).forEach(
      (weapon) => {
        renderItem(weapon);
      }
    );
  } else if (e.target.classList.contains("page-next")) {
    containerItems.innerHTML = "";
    listItems(itemsToShow, pageActual + 1, 18).forEach((weapon) => {
      renderItem(weapon);
    });
  } else if (e.target.classList.contains("page-previous") && pageActual > 1) {
    containerItems.innerHTML = "";
    listItems(itemsToShow, pageActual - 1, 18).forEach((weapon) => {
      renderItem(weapon);
    });
  } else if (e.target.classList.contains("page-next-plus")) {
    containerItems.innerHTML = "";
    listItems(itemsToShow, pageActual + 4, 18).forEach((weapon) => {
      renderItem(weapon);
    });
  } else if (
    e.target.classList.contains("page-previous-plus") &&
    pageActual > 5
  ) {
    containerItems.innerHTML = "";
    listItems(itemsToShow, pageActual - 4, 18).forEach((weapon) => {
      renderItem(weapon);
    });
  }
  createPagination();
  topFunction();
});

function filterObject(obj, callback) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(val, key))
  );
}

function filterItems() {
  let itemsFiltered = [];
  const searchValue = search.value.trim().toLowerCase();
  const filteredWeapons = filterObject(data["items_list"], (weapon) => {
    if (weapon.name.toLowerCase().includes(searchValue)) {
      return weapon;
    }
  });
  containerItems.innerHTML = "";
  Object.keys(filteredWeapons).forEach((weapon) => {
    itemsFiltered.push(data["items_list"][weapon]);
  });
  listItems(itemsFiltered, 1, 18).forEach((weapon) => {
    renderItem(weapon);
  });
  return itemsFiltered;
}

search.addEventListener("keyup", () => {
  itemsToShow = filterItems();
  createPagination();
});

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function chooseItemFilter(event) {
  search.value =
    event.target.textContent == "All" ? "" : event.target.textContent;
  itemsToShow = filterItems();
  createPagination();
}

containerMiddleFilter.addEventListener("click", chooseItemFilter);

btnRegister.addEventListener("click", () => {
  containerModal.id = "showUp";
});

btnCloseForm.addEventListener("click", () => {
  containerModal.id = "";
  containerModalItem.id = "";
});
/////////////// Wish List

function selectedSkin(event) {
  let skinChoosedName =
    event.target.parentNode.parentNode.firstElementChild.firstElementChild
      .innerText;
  //.querySelector(".card-item-title")
  event.target.classList.toggle("choosenSkin");
  console.log(skinChoosedName);
  if (!wishlist.includes(skinChoosedName)) {
    wishlist.push(skinChoosedName);
  } else {
    let removedItem = wishlist.indexOf(skinChoosedName);
    wishlist.splice(removedItem, 1);
    if (inWhishList){
      event.target.parentNode.parentNode.remove()
    }
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function addEventsHearts() {
  const choosenHeart = document.querySelectorAll(".heart");
  Array.from(choosenHeart).forEach((choosedWeapon) => {
    choosedWeapon.addEventListener("click", selectedSkin);
  });
}

const wishListDOM = document.querySelector(".button-wish");

function openWishList() {
  let wishListArray = [];
  console.log("sera que vai?");
  wishlist.forEach((weapon) => {
    weapon = weapon.replace(/'/g, "&#39");
    wishListArray.push(data["items_list"][weapon]);
  });
  itemsToShow = wishListArray;
  renderItems()
  inWhishList = true;
}
wishListDOM.addEventListener("click", openWishList);

window.onload = () => {
  addEventsHearts();
};

const highestPriceFilterBtn = document.querySelector('.highestPrice')
const lowestPriceFilterBtn = document.querySelector('.lowestPrice')

sortByPrice = (highest) => {
  itemsToShow.sort((a, b) => {
    if(a.price == null || b.price == null){
      return 1
    }
    if([a.price['7_days'] == null || 0] || [b.price['7_days'] == 0 || null]){
      return highest ? parseFloat(b.price['all_time'].median) - parseFloat(a.price['all_time'].median) : parseFloat(a.price['all_time'].median) - parseFloat(b.price['all_time'].median);
    }
    return highest ? parseFloat(b.price['7_days'].median) - parseFloat(a.price['7_days'].median): parseFloat(a.price['7_days'].median) - parseFloat(b.price['7_days'].median)
  });
}

function objToArray (obj) {
  if(!Array.isArray(obj)){
    console.log('não é array')
    array = []

    Object.keys(obj).forEach((item) => {
      array.push(obj[item]);
    });
    return array
  }
  return obj
}

lowestPriceFilterBtn.addEventListener('click', () => {
    itemsToShow = objToArray (itemsToShow)
    sortByPrice(false)
    renderItems()
})

highestPriceFilterBtn.addEventListener('click', () => {
  itemsToShow = objToArray (itemsToShow)
  sortByPrice(true)
  renderItems()
})




function newZoom(){
  let scale = 1;
  const el = document.querySelector('.detail-view');
  el.onwheel = (event) =>{
    scale += event.deltaY * -0.01;
    // Restrict scale
    scale = Math.min(Math.max(.125, scale), 4);
    // Apply scale transform
    el.style.transform = `scale(${scale < 1?1:scale})`;
  };
  el.addEventListener('wheel', (event) =>{
    scale += event.deltaY * -0.01;
    // Restrict scale
    scale = Math.min(Math.max(.125, scale), 4);
    // Apply scale transform
    el.style.transform = `scale(${scale < 1?1:scale})`;
  });
  let inImg = false;
  el.addEventListener("mousemove", (e) =>{
    inImg = true;
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY -e.target.offsetTop;
    el.style.transformOrigin = `${x}px ${y}px`;
    el.style.transform = `scale(${scale < 1?1:scale})`;
  });
  el.addEventListener("mouseenter", () =>{
    scale=1.05
  })
  el.addEventListener("mouseleave", () =>{
    inImg = false;
    el.style.transformOrigin = "center center";
    el.style.transoform = "scale(1)";
  })
}


// const containerItems = document.querySelector(".container-itens");
// const cardItens = document.querySelectorAll(".card-item ");

btnCloseModalItem.addEventListener('click', () =>{
  containerModalItem.id = ''
})


function showCardModal(){
  const cardItens = document.querySelectorAll(".card-item ");
cardItens.forEach((card) =>{
  card.addEventListener("click", (event) => {
    if(event.target.tagName.toLowerCase() == 'img'){
      containerModalItem.id = "showUp";
      const weapomModalSelection = event.target.parentNode.parentNode.firstElementChild.firstElementChild.innerText;
      const filteredWeapon = filterObject(data["items_list"], (weapon) => {
        if (weapon.name.toLowerCase().includes(weapomModalSelection.trim().toLowerCase())) {
          return weapon;
        }
      });
      console.log(weapomModalSelection)
      const htmlModal =
      `<div class="form-close-btn form-close-modal">&times;</div>
      <div class="container-modal-item-intern">
        <div class="container-modal-item-left">
            <div class="container-item-left-img">
          <img class="detail-view" src="https://community.cloudflare.steamstatic.com/economy/image/${filteredWeapon[weapomModalSelection].icon_url_large}"/>
        </div>
          <div class="containier-modal-item-left-footer">
            <div>Inspect Online</div>
            <div>Make an offer</div>
            <div>Check prices</div>
            <div>tarantam</div>
          </div>
        </div>
        <div class="container-modal-item-right">
          <div class="modal-item-name-exterior">${filteredWeapon[weapomModalSelection].gun_type} | ${filteredWeapon[weapomModalSelection].weapon }</div>
          <div class="modal-item-skin-name"><strong>${filteredWeapon[weapomModalSelection].name}</strong></div>
          <!-- <div class="container-modal-info"></div> -->
          <div class="price-steam">${filteredWeapon[weapomModalSelection].price['7_days'].median}</div>
          <div class="item-price"><h2>Our price: ${filteredWeapon[weapomModalSelection].price['7_days'].median}</h2></div>
          <button class="btn-add-cart button">ADD TO CARD</button>
        </div>
      </div>`
      containerModalItem.innerHTML = htmlModal;
      newZoom();
    }

})
})
}
function modalItem() {

const searchValue = search.value.trim().toLowerCase();

  const filteredWeapons = filterObject(data["items_list"], (weapon) => {
    if (weapon.name.toLowerCase().includes(searchValue)) {
      return weapon;
    }
  });
}