"use strict";

/*
Dans cette fonction nous récupérons le contenu du localstorage dans une variable.
Nous créons une variable numberItems qui contiendra le nombre d'élément dans le localstorage
Si nous avons au moins un produit dans le localstorage, alors une bulle apparait dans le HTML pour nous indiquer le nombre de produits dans le panier
la fonction est appelée sur les différentes pages du projet et au clique du bouton 'ajouter au panier' de la page product.html.
 */
function numItem() {
    let basketItems = localStorage.getItem("product");
    let items = JSON.parse(basketItems);
    let numberItems = 0;

    if (items !== null) {
        for (let i = 0; i < items.length; i++) {
            numberItems = numberItems + items[i].quantity;
        }
    }

    let basketItem = document.getElementById("basketItem");

    if (numberItems >= 1) {
        basketItem.innerHTML = numberItems;
    }
}