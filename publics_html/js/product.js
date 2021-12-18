"use strict"

/*
La fonction numItem génère le nombre de produits dans le panier pour l'afficher dans la barre de navigation
*/
numItem();

/*
=========================================================================================================================================================
Variables globales
=========================================================================================================================================================
*/
/*
Génration de variables globales :
----currentProduct est un objet contenant le produit choisi
----product est un tableau, il sera envoyé dans le localstorage
*/
let currentProduct = {};
let product = [];

/*
Grâce à la fonction getProduct() nous interrogeons l'API et testons la réponse.
En cas de réponse positive, nous mettons la valeur de retour dans la variable currentProduct et nous lançons la fonction objectDescription.
En cas de réponse négative, nous retournons dans la console le type d'erreur.
*/
getProduct();
function getProduct () {
    let params = (new URL(document.location)).searchParams;
    let idProduct = params.get('id');
    fetch("http://localhost:3000/api/cameras/" + idProduct)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            currentProduct = value;
            objectDescription(value);
        })
        .catch(function (err) {
            console.log(err);
        });
}

/*
=========================================================================================================================================================
Affichage d'un article
=========================================================================================================================================================
*/
/*
La fonction objectDescription permet grâce à innerHTML d'alimenter dynamiquement la page product.html avec les détails sur l'article choisi
*/
function objectDescription(productSelection){
   const productPicture = document.querySelector("#description img");
   productPicture.src = productSelection.imageUrl;
   const productName = document.querySelector("#description h2");
   productName.innerHTML = productSelection.name;
   const productDescription = document.querySelector("#description p");
   productDescription.innerHTML = productSelection.description;
   for (let index in productSelection.lenses){
       let option = `option${index}`;
       let productOption = document.getElementById("options");
        productOption.innerHTML += '<option value=" ' + option + ' " id=" ' + option + ' ">' + productSelection.lenses[index] + '</option>'
   }
   const productPrice = document.getElementById("price");
   productPrice.innerHTML = productSelection.price/100 + ' €';
}

/*
=========================================================================================================================================================
Ajout au panier
=========================================================================================================================================================
*/
/*
Nous générons un événement click sur le bouton ajouter au panier et une fonction à fleche.
À partir de la troisième ligne, nous testons, à l'aide de la variable productQuantity, l'input quantité du site pour s'assurer qu'une quantité, au minimum de 1, à bien été mise. Si la condition est bonne :
En 5ème ligne, nous ajoutons au produit choisi la quantité mise sur le site
Nous vérifions dans le localStorage la présence de produits.
Si le localStorage est vide, à l'aide de la variable product (array) j'alimente pour la première fois le localStorage
À l'aide d'une boucle nous testons l'ID de l'ensemble des produits présents dans le localStorage par rapport au produit choisi sur le site pour y vérifier sa présdence.
En cas de réponse positive, nous récupérons dans une variable productPrésent l'index du produit dans le localStorage et nous mettons à jour la quantité de produits sachetés dans le localStorage. Enfin nous renvoyons le tout dans le localStorage (lignes 15 à 17)
Si le nouveau produit choisi n'est pas présent dans le localStorage, alors nous lui ajoutons le nouveau produit.
Nous mettons en route la fonction numItem pour mettre à jour le visuel dans la barre de navigation
Si nous n'avons pas choisi de quantité sur le site nous alertons l'utilisateur
*/

let addBasket = document.getElementById("addBasket");
addBasket.addEventListener("click", ev => {
    let productquantity = parseInt(document.querySelector('#quantite').value);
    if (productquantity >= 1){
        currentProduct.quantity = productquantity;
        let localStorageItems = localStorage.getItem("product");
        let localStorageItem = JSON.parse(localStorageItems);
        if (localStorageItem !== null){
            let productPresent = null;
            for (let i = 0; i < localStorageItem.length; i++ ){
                if (currentProduct._id === localStorageItem[i]._id){
                    productPresent = i;
                }
            }
            if (productPresent !== null){
                localStorageItem[productPresent].quantity += currentProduct.quantity;
                localStorage.setItem("product", JSON.stringify(localStorageItem));
                location.href = "../index.html";
            } else {
                localStorageItem.push(currentProduct);
                localStorage.setItem("product", JSON.stringify(localStorageItem));
                location.href = "../index.html";
            }

        } else {
            product.push(currentProduct);
            localStorage.setItem("product", JSON.stringify(product));
            location.href = "../index.html";
        }
    } else {
        alert("Vous devez àjouter au minimum un produit au panier")
    }

    numItem();
});

