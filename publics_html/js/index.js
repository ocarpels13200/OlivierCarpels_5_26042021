/*
La fonction numItem génère le nombre de produits dans le panier pour l'afficher dans la barre de navigation
*/

numItem()

/*
Grâce à la fonction getProduct() nous interrogeons l'API et testons la réponse.
En cas de réponse positive, nous déclenchons la fonction createProduct avec comme paramètre la valeur de retour de l'API.
En cas de réponse négative, nous retournons dans la console le type d'erreur.
*/

getProduct();

function getProduct (){
    fetch("http://localhost:3000/api/cameras")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            createProduct(value);
        })
        .catch(function(err) {
            console.log(err);
        });
}

/*
La fonction createProduct permets de créer les cards HTML des différents produits
Une boucle for in (index, products) permet de créer le bon nombre de cards.
la propriété innerHTML est utilisée pour ajouter du code dans la page HTML
 */

function createProduct (products){
    for (index in products){
        let cardsSection = document.getElementById('cardsSection');
        cardsSection.innerHTML += '' +
            '<article class="col-12 col-md-6 col-lg-4">' +
                '<a class="text-decoration-none" href="./views/product.html?id=' + products[index]._id + '">' +
                    '<div class="card border-dark h-100">' +
                        '<img class="card-img-top h-100" src=" ' + products[index].imageUrl + ' ">' +
                        '<div class="card-body p-0">' +
                            '<h2 class="card-title h5 text-center">' + products[index].name + '</h2>' +
                            '<div class="border text-center text-light bg-dark py-2">' + products[index].price/100 + ' €</div>' +
                        '</div>' +
                    '</div>' +
                '</a>' +
            '</article>';
    }
}