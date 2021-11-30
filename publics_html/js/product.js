/*
La fonction numItem génère le nombre de produits dans le panier pour l'afficher dans la barre de navigation
*/
numItem()

/*
Génration de variables globales :
----documentURL récupère l'ID du produit choisi
----currentProduct est un objet contenant le produit choisi
----product est un tableau, il sera envoyé dans le localstorage
*/
let documentURL = document.location.search.substring(4);
let currentProduct = {};
let product = [];

/*
Grâce à la fonction getProduct() nous interrogeons l'API et testons la réponse.
En cas de réponse positive, nous alimentons avec la valeur de retour la variable currentProduct et nous lançons la fonction objectDescription.
En cas de réponse négative, nous retournons dans la console le type d'erreur.
*/
getProduct();
function getProduct () {
    fetch("http://localhost:3000/api/cameras/" + documentURL)
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
La fonction objectDescription permet grâce à innerHTML d'alimenter la page product.html avec les informations du produit choisi
*/
function objectDescription(productSelection){
   const productPicture = document.querySelector("#description img");
   productPicture.src = productSelection.imageUrl;
   const productName = document.querySelector("#description h2");
   productName.innerHTML = productSelection.name;
   const productDescription = document.querySelector("#description p");
   productDescription.innerHTML = productSelection.description;
   for (index in productSelection.lenses){
       let option = `option${index}`;
       let productOption = document.getElementById("options");
        productOption.innerHTML += '<option value=" ' + option + ' " id=" ' + option + ' ">' + productSelection.lenses[index] + '</option>'
   }
   const productPrice = document.getElementById("price");
   productPrice.innerHTML = productSelection.price/100 + ' €';
}

/*
Lignes 79 et 80 -> Nous générons un événement click sur le bouton ajouter au panier et une fonction à fleche.

    Lignes 81 et 82 -> À partir de la troisième ligne, nous testons, à l'aide de la variable productQuantity, l'input quantité du site pour s'assurer qu'une quantité, au minimum de 1, à bien été mise.
    Lignes 105 à 107 -> Si nous n'avons pas choisi de quantité sur le site nous alertons l'utilisateur
    Ligne 82 -> Si la condition est bonne :

        Ligne 83 -> En 5ème ligne, nous ajoutons au produit choisi la quantité mise sur le site

            Lignes 84 à 86 -> Nous vérifions dans le localStorage la présence de produits.
            Lignes 101 à 104 -> Si le localStorage est vide, à l'aide de la variable product (array) j'alimente pour la première fois le localStorage

                Lignes 88 à 92 -> À l'aide d'une boucle nous testons l'ID de l'ensemble des produits présents dans le localStorage par rapport au produit choisi sur le site pour y vérifier sa présdence.

                Lignes 87, 90 et 93 à 95 -> En cas de réponse positive, nous récupérons dans une variable productPrésent l'index du produit dans le localStorage et nous mettons à jour la quantité de produits sachetés dans le localStorage. Enfin nous renvoyons le tout dans le localStorage (lignes 15 à 17)

                Lignes 96 à 99 -> Si le nouveau produit choisi n'est pas présent dans le localStorage, alors nous lui ajoutons le nouveau produit.

Ligne 109 -> Nous mettons en route la fonction numItem pour mettre à jour le visuel dans la barre de navigation

Ligne 110 ->2
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
            } else {
                localStorageItem.push(currentProduct);
                localStorage.setItem("product", JSON.stringify(localStorageItem));
            }

        } else {
            product.push(currentProduct);
            localStorage.setItem("product", JSON.stringify(product));
        }
    } else {
        alert("Vous devez àjouter au minimum un produit au panier")
    }

    numItem();
    window.location.reload();
});