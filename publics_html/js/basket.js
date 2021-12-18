"use strict"
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
let localStorageItem = JSON.parse(localStorage.getItem("product"));
let basket = document.getElementById("basket");
let totalPricePerItem;
let totalPrice = 0;
let contact = {};
let products = [];

/*
La condition ci-dessous permet de vérifier la présence ou non de produit dans le localStorage.
En cas de présence de produits, par le biais d'une boucle nous mettons à jour les prix par produits et le prix total. Nous complétons également le fichier HTML avec les bonnes informations.
Nous indiquons en cas de non présence de produits dans le localStorage que le panier est vide.
*/
addProductTable();
function addProductTable() {
    basket.innerHTML = "";
    totalPricePerItem = 0;
    totalPrice = 0;
    if (localStorageItem && localStorageItem.length !== 0) {
        for (let i = 0; i < localStorageItem.length; i++) {
            totalPricePerItem = parseInt((localStorageItem[i].price / 100) * (localStorageItem[i].quantity));
            totalPrice = parseInt(totalPrice + totalPricePerItem);
            basket.innerHTML += '<tr id="basketLine' + i + '">' +
                '<td class="text-nowrap">' + localStorageItem[i].name + '</td>' +
                '<td class="px-5 text-end text-nowrap">' + localStorageItem[i].price / 100 + ' €</td>' +
                '<td class="text-center text-nowrap"><a class="btn btn-outline-primary btn-sm me-3 deleteProduct">-</a><span id="qte' + i + '">' + localStorageItem[i].quantity + '</span><a class="btn btn-outline-primary btn-sm ms-3 addProduct">+</a></td>' +
                '<td class="text-end text-nowrap"><span id="itemPrice' + i + '">' + totalPricePerItem + ' €</span></td>' +
                '<td class="text-center text-nowrap"><a class="btn btn-outline-primary btn-sm removeProducts"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-x" viewBox="0 0 16 16">\n' +
                '  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\n' +
                '</svg></a></td>' +
                '</tr>';
        }
        basket.innerHTML += '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td class="text-end fw-bold text-nowrap">Total TTC :</td>' +
            '<td class="text-end text-nowrap" id="total">' + totalPrice + ' €</td>' +
            '<td></td>' +
            '</tr>';
    } else {
        basket.innerHTML = '<h2 class="h5 text-center text-danger m-5">Votre panier est vide</h2>';
    }
}

/*
=========================================================================================================================================================
FONCTIONS PERMETTANT DE SUPPRIMER, D'AJOUTER OU DE REDUIRE LA QUANTITE D'UN PRODUIT
=========================================================================================================================================================
*/

/*
Ces lignes permettent par un clique sur le bouton "X" de supprimer un produit du panier et du localStorage
*/
let removeProducts = document.getElementsByClassName("removeProducts");         //removeProducts -> emplacement du bouton "X"
for (let i = 0; i < removeProducts.length; i++) {       //Boucle permettant de parcourir l'ensemble des boutons "X" et d'écouter le click dessus
    removeProducts[i].addEventListener("click", evt => {
        localStorageItem.splice(i, 1);
        localStorage.setItem("product", JSON.stringify(localStorageItem));
        if (localStorageItem.length === 0) {
            localStorage.clear();
        }
        deleteCurrentProduct(i);        //Appel de la fonction deleteCurrentProduct permettant de supprimer la ligne du tableau
        changeTotalPrice();     //Appel de la fonction changeTotalPrice permettant de recalculer le prix total
        numItem();      //Appel de la fonction numItem permettant de mettre à jour la bulle dans la barre de navigation
    })
}

/*
Ces lignes permettent d'ajouter pour un produit donné un élément à la quantité
La fonction numItem met à jour la bulle dans la barre de navigation
*/
let addProduct = document.getElementsByClassName("addProduct");     //addProduct -> emplacement du bouton "+"
for (let i = 0; i < addProduct.length; i++){        //Boucle permettant de parcourir l'ensemble des boutons "+" et d'écouter le click dessus
    addProduct[i].addEventListener("click", evt => {
        localStorageItem[i].quantity++;
        localStorage.setItem("product", JSON.stringify(localStorageItem));
        changeCurrentProductQte(i);     //Appel de la fonction changeCurrentProductQte permettant de mettre à jour la quantité sur la page HTML
        changePricePerItem(i);       //Appel de la fonction changePricePerItem permettant de recalculer le prix total pour le produit en question
        changeTotalPrice();      //Appel de la fonction changeTotalPrice permettant de recalculer le prix total
        numItem();      //Appel de la fonction numItem permettant de mettre à jour la bulle dans la barre de navigation
    })
}

/*
Ces lignes permettent de supprimer pour un produit donné un élément à la quantité.
Si, en supprimant un élément nous arrivons à zéro alors nous supprimons l'objet du panier et du localStorage.
La fonction numItem met à jour la bulle dans la barre de navigation
*/
let deleteProduct = document.getElementsByClassName("deleteProduct");       //addProduct -> emplacement du bouton "-"
for (let i = 0; i < deleteProduct.length; i++) {        //Boucle permettant de parcourir l'ensemble des boutons "-" et d'écouter le click dessus
    deleteProduct[i].addEventListener("click", evt => {
        localStorageItem[i].quantity--;
        if (localStorageItem[i].quantity === 0) {       //Condition imposant d'avoir au minimum un produit sur le panier
            localStorageItem[i].quantity++;
        }
        localStorage.setItem("product", JSON.stringify(localStorageItem));
        changeCurrentProductQte(i);     //Appel de la fonction changeCurrentProductQte permettant de mettre à jour la quantité sur la page HTML
        changePricePerItem(i);       //Appel de la fonction changePricePerItem permettant de recalculer le prix total pour le produit en question
        changeTotalPrice();      //Appel de la fonction changeTotalPrice permettant de recalculer le prix total
        numItem();      //Appel de la fonction numItem permettant de mettre à jour la bulle dans la barre de navigation
    })
}


/*
=========================================================================================================================================================
FONCTIONS COMPLEMENTAIRES UTILISEES PAR LES FONCTIONS CI-DESSUS POUR SUPPRIMER, AJOUTER OU DIMINUER LA QUANTITE D'UN PRODUIT ET POUR MODIFIER LES PRIX.
=========================================================================================================================================================
*/
/*Après avoir supprimer un article du localStorage, je dois supprimer la ligne du tableau dans le panier.
Je commence par repérer la ligne concernée pour ensuite supprimer à l’aide de la méthode removeChild()  son contenu.*/
function deleteCurrentProduct(index) {
    let currentProduct = document.getElementById("basketLine" + index);
    basket.removeChild(currentProduct);
    location.href = "./basket.html";
}

/*Après avoir réduit ou augmenter la quantité d’un article dans le localStorage, je dois mettre à jour le panier.
Je commence par repérer l’emplacement contenant la quantité d’un article et je la met à jour en y injectant dynamiquement la quantité présente dans le localStorage.*/
function changeCurrentProductQte(index){
    let currentQuantity = document.getElementById("qte" + index);
    currentQuantity.innerHTML = JSON.parse(localStorage.getItem("product"))[index].quantity;
}

/*Cette fonction me permet de recalculer le total TTC pour un articles. J’utilise une variable pour calculer le total et j’injecte dynamiquement la valeur de la variable.*/
function changePricePerItem(index){
    let itemPrice = document.getElementById("itemPrice" + index);
    totalPricePerItem = parseInt((localStorageItem[index].price / 100) * (localStorageItem[index].quantity));
    itemPrice.innerHTML = totalPricePerItem + " €";
}

/*Cette fonction me permet de recalculer le total TTC pour l’ensemble de mes articles. J’utilise une variable, une boucle et j’injecte dynamiquement la valeur de la variable*/
function changeTotalPrice(){
    let total = document.getElementById("total");
    totalPrice = 0;
    if (localStorageItem) {
        for (let i = 0; i < localStorageItem.length; i++) {
            totalPricePerItem = parseInt((localStorageItem[i].price / 100) * (localStorageItem[i].quantity));
            totalPrice = parseInt(totalPrice + totalPricePerItem);
        }
    }
    total.innerHTML = totalPrice + " €";
}

/*
=========================================================================================================================================================
fonctions permettant de créer le contact à partir du formulaire (createContactOrder) et la liste des produits et quantités commandés (createProductsOrder)
=========================================================================================================================================================
*/

function createContactOrder() {
    const contact = {
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        email : document.getElementById("email").value,
    }
    return contact;
}

function createProductsOrder() {
    const products = []
    if (localStorageItem.length !==null) {
        for (let i = 0; i < localStorageItem.length; i++) {
            products.push(localStorageItem[i]._id);
        }
    }
    return products;
}

/*
=========================================================================================================================================================
fonctions permettant de contrôler à l'aide des types input HTML et des attributs required que les champs sont bien remplis et de mettre en place
des message d'erreurs au cas ou
=========================================================================================================================================================
*/

/* formanalyse() se charge de repérer les attributs required du HTML
 de vider les messages d’alertes en cas de contenu  non conforme à l’aide de la fonction formReset()
 de vérifier si le contenu est conforme à l’aide de la fonction formValidate()*/
function formAnalyse() {
    let formRequired = document.querySelectorAll("input[required]");
    formRequired.forEach((form) =>{
        formReset(form);
    })
    let valid = true;
    formRequired.forEach((form) =>{
        if (! formValidate(form)) {
            valid = false;
        };
    });
    if (valid) {
       return true;
    }
}

/*En cas de contenu non conforme, formReset() supprime les messages d’erreurs à l’aide de la propriété nextElementSibling et de la méthode removeChild.*/
function formReset(form){
    let formLabel = form.nextElementSibling;
    while (formLabel.firstElementChild) {
        formLabel.removeChild(formLabel.firstElementChild);
    }
}

/*
Enfin la fonction formValidate() se charge de vérifier si le contenu est conforme et d’ajouter au cas ou un message d’erreur.*/
function formValidate (form) {
    if (form.checkValidity()) {
        return true;
    } else {
        form.nextElementSibling.insertAdjacentHTML("beforeend", `<span class="text-danger fw-bold">${form.validationMessage}</span>`);
        return false;
    }
}

/*
=========================================================================================================================================================
fonctions permettant de valider la commande et d'obtenir le numéro d'ordre
=========================================================================================================================================================
*/

let validate = document.getElementById("validate");
validate.addEventListener("click", (ev) => {
    let valid = formAnalyse();
    if (valid === true) {
        contact = createContactOrder();
        products = createProductsOrder();
        fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact, products})
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            let order = [value];
            localStorage.setItem("order", JSON.stringify(order));
            console.table(order);
            document.location.href = "validate.html";
        })
    }
})