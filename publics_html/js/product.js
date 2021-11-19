let documentURL = document.location.search.substring(4);

console.log(documentURL);

fetch("http://localhost:3000/api/cameras/" + documentURL)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        const product = value;
        objectDescription(product);
    })
    .catch(function(err) {
        console.log(err);
    });

function objectDescription(product){
    let description = document.getElementById('description');
    console.log(product);
    description.innerHTML =
        '<article class="col-8 offset-2 my-5">' +
            '<div class="card border-dark">' +
                '<img class="card-img-top" src=" ' + product.imageUrl + ' ">' +
                '<div class="card-body p-0">' +
                    '<h2 class="card-title h5 text-center mt-4">' + product.name + '</h2>' +
                    '<p class="card-text p-2">' + product.description + '</p>' +
                '</div>' +
                '<div class="card-footer border-dark bg-black bg-opacity-25 d-flex flex-column m-0 pt-3">' +
                    '<div class="d-flex justify-content-center">' +
                        '<label class="form-label w-25 align-self-center" for="options"> Options : </label>' +
                        '<select id="options" class="form-select w-50" name="options">' +
                            '<option selected="">---Choisissez votre objectif---</option>' +
                            '<option value="35mm">' + product.lenses[0] + '</option>' +
                            '<option value="50mm">' + product.lenses[1] + '</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="d-flex justify-content-center">' +
                        '<div class="form-floating my-3 w-75">' +
                            '<input id="quantite" class="form-control " type="number" min="1" max="5" required="true" name="quantite" placeholder="Quantité">' +
                            '<label for="quantite">Quantité</label> ' +
                        '</div>' +
                    '</div>' +
                    '<div class="d-flex justify-content-around">' +
                        '<p class="border-dark bg-black text-light text-center m-0 p-2">'+ product.price/100 +'€</p>' +
                        '<button class="btn btn-outline-primary" type="button">Ajouter au panier</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</article>';
}