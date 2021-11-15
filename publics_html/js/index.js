/* Nous interrogeons l'API :

*** en cas de réponse positive nous alimentons le fichier index.html grâce à la fonction createProduct
*** en cas de non réponse, l'erreur est retourné dans la console.
*/


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

function createProduct (products){
    for (index in products){
        let cardsSection = document.getElementById('cardsSection');
        cardsSection.innerHTML += '' +
            '<article class="col-12 col-md-6 col-lg-4">' +
            '<a class="text-decoration-none" href="./views/product.html">' +
            '<div class="card border-dark h-100">' +
            '<img class="card-img-top h-100" src=" ' + products[index].imageUrl + ' ">' +
            '<div class="card-body">' +
            '<h2 class="card-title h5">' + products[index].name + '</h2>' +
            '<p class="card-text text-dark p-2">' + products[index].description + '</p>' +
            '<div class="col-8 offset-2 border rounded-pill text-center text-light bg-dark mb-1 py-2">' + products[index].price + ' €</div>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</article>';
    }
}
