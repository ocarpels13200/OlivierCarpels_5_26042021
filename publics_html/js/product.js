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
La fonction objectDescription permet grâce à innerHTML d'alimenter la page product.html avec les information du produit choisi
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
À partir d'ici, nous générons un événement sur un click sur le bouton ajouter au panier
Dans la fonction à flèche, nous récupérons le contenu du localstorage pour vérifier si un produit y est déjà présent.
Si le localStorage n'est pas vide, nous poussons le produit choisi dans selui-ci
Si le localStorage est vide, alors nous pourssons le produit choisi dans le tableau product et nous l'envoyons dans le localstorage
Enfin nous lançons la fonction numitem pour générer le nombre de produits dans le panier
*/
let addBasket = document.getElementById("addBasket");
addBasket.addEventListener("click", ev => {
    currentProduct.quantity = parseInt(document.querySelector('#quantite').value);
    let localStorageItems = localStorage.getItem("product");
    let localStorageItem = JSON.parse(localStorageItems);
    if (localStorageItem !== null){

        localStorageItem.push(currentProduct);
        localStorage.setItem("product", JSON.stringify(localStorageItem));

    } else {
        product.push(currentProduct);
        localStorage.setItem("product", JSON.stringify(product));
    }
    numItem();
});