let wishlist = [
    'AWP | Electric Hive (Field-Tested)',
    'USP-S | Printstream (Field-Tested)',
    'AK-47 | Baroque Purple (Battle-Scarred)'
]
const item = document.querySelectorAll('.card-item')

if (JSON.parse(localStorage.getItem('weaponList'))) {
    wishlist = JSON.parse(localStorage.getItem('weaponList'))
}

localStorage.setItem('wishlist', JSON.stringify(wishlist))

