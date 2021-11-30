/*
La fonction numItem génère le nombre de produits dans le panier pour l'afficher dans la barre de navigation
*/
numItem()

/*
Génration de variables globales :
----localStorageItems récupère sur le localStorage les produits présents
----localStorageItem transforme le contenu de la variable précédente pour être lisible par le Javascript
----basket permet de repérer sur la page HTML le tableau récapitulant les produits achetés
----totalPricePerItem représente le prix total pour un produit donné -> (prix produit * quantité)
----totalPrice représente le prix total de l'ensemble des produits -> (Somme des totalPricePerItem)
*/
let localStorageItems = localStorage.getItem("product");
let localStorageItem = JSON.parse(localStorageItems);
let basket = document.getElementById("basket");
let totalPricePerItem;
let totalPrice = 0;

/*
La condition ci-dessous permet de vérifier la présence ou non de produit dans le localStorage.
lignes 25 à 45 -> En cas de présence de produits, par le biais d'une boucle nous mettons à jour les prix par produits et le prix total. Nous complétons également le fichier HTML avec les bonnes informations.
lignes 46 à 48 -> Nous indiquons en cas de non présence de produits dans le localStorage que le panier est vide.
*/
if (localStorageItem !==null){
    for (let i = 0; i < localStorageItem.length; i++){
        totalPricePerItem = parseInt((localStorageItem[i].price/100) * (localStorageItem[i].quantity));
        totalPrice = parseInt(totalPrice + totalPricePerItem);
        basket.innerHTML += '<tr>' +
            '<td class="text-nowrap">' + localStorageItem[i].name + '</td>' +
            '<td class="px-5 text-end text-nowrap">' + localStorageItem[i].price/100 + ' €</td>' +
            '<td class="text-center text-nowrap"><a class="btn btn-outline-primary btn-sm me-3 deleteProduct">-</a>' + localStorageItem[i].quantity + '<a class="btn btn-outline-primary btn-sm ms-3 addProduct">+</a></td>' +
            '<td class="text-end text-nowrap">' + totalPricePerItem + ' €</td>' +
            '<td class="text-center text-nowrap"><a class="btn btn-outline-primary btn-sm deleteProducts"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-x" viewBox="0 0 16 16">\n' +
            '  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\n' +
            '</svg></a></td>' +
            '</tr>';
    }
    basket.innerHTML += '<tr>' +
        '<td></td>' +
        '<td></td>' +
        '<td class="text-end fw-bold text-nowrap">Total TTC :</td>' +
        '<td class="text-end text-nowrap">' + totalPrice + ' €</td>' +
        '<td></td>' +
        '</tr>';
} else {
    basket.innerHTML = '<h2 class="h5 text-center text-danger m-5">Votre panier est vide</h2>';
}

/*
lignes 53 à 64 -> ces lignes permettent sur un clique sur le buton "X" de supprimer un produit sur le panier et de le supprimer du localStorage
*/
let deleteProducts = document.getElementsByClassName("deleteProducts");
for (let i = 0; i < deleteProducts.length; i++){
    deleteProducts[i].addEventListener("click", evt => {
        localStorageItem.splice(localStorageItem[i], 1);
        localStorage.setItem("product", JSON.stringify(localStorageItem));
        if (localStorageItem.length === 0){
            localStorage.clear();
        }
        numItem();
        window.location.reload();
    })
}

/*
lignes 70 à 78 -> Ces lignes permettent d'ajouter pour un produit donné un élément à la quantité
La fonction numItem met à jour la bulle dans la barre de navigation
*/
let addProduct = document.getElementsByClassName("addProduct");
for (let i = 0; i < addProduct.length; i++){
    addProduct[i].addEventListener("click", evt => {
        localStorageItem[i].quantity++;
        localStorage.setItem("product", JSON.stringify(localStorageItem));
        numItem();
        window.location.reload();
    })
}

/*
Lignes 85 à 101 -> Cest lignes permettent de supprimer pour un produit donné un élément à la quantité.
Si, en supprimant un élément nous arrivons à zéro alors nous supprimons l'objet du panier et du localStorage.
La fonction numItem met à jour la bulle dans la barre de navigation
*/
let deleteProduct = document.getElementsByClassName("deleteProduct");
for (let i = 0; i < deleteProduct.length; i++){
    deleteProduct[i].addEventListener("click", evt => {
        localStorageItem[i].quantity--;
        if (localStorageItem[i].quantity===0){
            localStorageItem.splice(localStorageItem[i], 1);
            localStorage.setItem("product", JSON.stringify(localStorageItem));
            if (localStorageItem.length === 0){
                localStorage.clear();
            }
        } else {
            localStorage.setItem("product", JSON.stringify(localStorageItem));
        }
        numItem();
        window.location.reload();
    })
}

