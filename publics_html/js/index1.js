// Création d'une variable contenant un tableau tableau //
const products = [
        {
            pictures : "Images/camera/camera1.jpg",
            picturesAlt : "Caméra 1",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.",
            money : "150€"
        },
        {
            pictures : "Images/camera/camera2.jpg",
            picturesAlt : "Caméra 2",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.",
            money : "200€"
        },
        {
            pictures : "Images/camera/camera3.jpg",
            picturesAlt : "Caméra 3",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.",
            money : "130€"
        },
        {
            pictures : "Images/camera/camera4.jpg",
            picturesAlt : "Caméra 4",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.",
            money : "120€"
        },
    {
        pictures : "Images/camera/camera5.jpg",
        picturesAlt : "Caméra 5",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.",
        money : "50€"
    },
    {
        pictures : "Images/camera/camera6.jpg",
        picturesAlt : "Caméra 6",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.",
        money : "300€"
    }
]

// Fonction permettant de créer les cartes produits sur la page index.html //
function createProduct (products){
    for (index in products){
        // Recherche sur le code HTML actuel l'ID "cardsSection" //
        let cardsSection = document.getElementById('cardsSection');
        // Création des balises articles et injection dans la page index.html //
        cardsSection.innerHTML += '' +
            '<article class="col-12 col-md-6 col-lg-4">' +
                '<a class="text-decoration-none" href="./views/product.html">' +
                    '<div class="card border-dark h-100">' +
                        '<img class="card-img-top" src=" ' + products[index].pictures + ' ">' +
                        '<div class="card-body">' +
                            '<h2 class="card-title h5">Description :</h2>' +
                            '<p class="card-text text-dark p-2">' + products[index].description + '</p>' +
                            '<div class="col-8 offset-2 border rounded-pill text-center text-light bg-dark mb-1 py-2">' + products[index].money + '</div>' +
                        '</div>' +
                    '</div>' +
                '</a>' +
            '</article>';
        /*
        let newArticle = document.createElement("article");
        newArticle.classList.add("col-12", "col-md-6", "col-lg-4");
        cardsSection.appendChild(newArticle);
        // Création des balises liens (anchor) et injection dans la page index.html //
        let newLink = document.createElement("a");
        newLink.href = 'views/product.html';
        newLink.classList.add("text-decoration-none");
        newArticle.appendChild(newLink);
        // Création des balises div (card) et injection dans la page index.html //
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "border-dark", "h-100");
        newLink.appendChild(cardDiv);
        // Création des balises images et injection dans la page index.html //
        let cardPicture = document.createElement("img");
        cardPicture.src = products[index].pictures;
        cardPicture.alt = products[index].picturesAlt;
        cardDiv.appendChild(cardPicture);
        // Création des balises div (card body) et injection dans la page index.html //
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardDiv.appendChild(cardBody);
        // Création des balises h2 (card title) et injection dans la page index.html //
        let cardTitle = document.createElement("h2");
        cardTitle.classList.add("h5", "card-body");
        cardTitle.innerHTML = "Description :";
        cardDiv.appendChild(cardTitle);
        // Création des balises paragraphes (card texte) et injection dans la page index.html //
        let cardDescription = document.createElement("p");
        cardDescription.classList.add("card-text", "text-dark", "p-2");
        cardDescription.innerHTML = products[index].description;
        cardDiv.appendChild(cardDescription);
        // Création des balises div (Prix) et injection dans la page index.html //
        let cardPrice = document.createElement("div");
        cardPrice.classList.add("col-8", "offset-2", "border", "rounded-pill", "text-center", "text-light", "bg-dark", "mb-1", "py-2");
        cardPrice.innerHTML = products[index].money;
        cardDiv.appendChild(cardPrice);

         */
    }
}
// Mise en route de la fonction //
createProduct(products);

