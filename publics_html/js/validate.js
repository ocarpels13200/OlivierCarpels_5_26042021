let commandOrder = JSON.parse(localStorage.getItem("order"));
recapitulatif();

function recapitulatif() {
    let productsList = document.getElementById("products");
    let products = commandOrder[0].products
    let localStorageItem = JSON.parse(localStorage.getItem("product"));
    console.table(products);
    for (let i = 0; i < products.length; i++) {
        productsList.innerHTML += '' +
            '<li>' + localStorageItem[i].quantity + " " + products[i].name + '</li>';
        let price = document.getElementById("price");
        totalPrice = 0;
        if (localStorageItem) {
            for (let i = 0; i < localStorageItem.length; i++) {
                totalPricePerItem = parseInt((localStorageItem[i].price / 100) * (localStorageItem[i].quantity));
                totalPrice = parseInt(totalPrice + totalPricePerItem);
            }
            price.innerHTML = totalPrice + '€';
            let order = document.getElementById("order");
            order.innerHTML = commandOrder[0].orderId;
        }
    }
    localStorage.clear();
}

