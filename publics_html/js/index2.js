// Création d'une classe product comprenant l'image, la description et le prix de chaque produit //
class Products{
    constructor(pictures, picturesAlt, description,money){
        this.pictures = pictures;
        this.picturesAlt = picturesAlt;
        this.description = description;
        this.money = money;
    }
    createProduct(){
        let cardsSection = document.getElementById('cardsSection');
        let newArticle = document.createElement("article");
        newArticle.classList.add("col-12", "col-md-6", "col-lg-4");
        cardsSection.appendChild(newArticle);
        let newLink = document.createElement("a");
        newLink.href = 'views/product.html';
        newLink.classList.add("text-decoration-none");
        newArticle.appendChild(newLink);
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "border-dark", "h-100");
        newLink.appendChild(cardDiv);
        let cardPicture = document.createElement("img");
        cardPicture.src = this.pictures;
        cardPicture.alt = this.picturesAlt;
        cardDiv.appendChild(cardPicture);
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardDiv.appendChild(cardBody);
        let cardTitle = document.createElement("h2");
        cardTitle.classList.add("h5", "card-body");
        cardTitle.innerHTML = "Description :";
        cardDiv.appendChild(cardTitle);
        let cardDescription = document.createElement("p");
        cardDescription.classList.add("card-text", "text-dark", "p-2");
        cardDescription.innerHTML = this.description;
        cardDiv.appendChild(cardDescription);
        let cardPrice = document.createElement("div");
        cardPrice.classList.add("col-8", "offset-2", "border", "rounded-pill", "text-center", "text-light", "bg-dark", "mb-1", "py-2");
        cardPrice.innerHTML = this.money;
        cardDiv.appendChild(cardPrice);
    }
}
// Création des instances de classe -> produits //
let product0 = new Products("Images/camera/camera1.jpg", "Caméra 1","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.", "150€");
let product1 = new Products("Images/camera/camera2.jpg", "Caméra 2","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.", "200€");
let product2 = new Products("Images/camera/camera3.jpg", "Caméra 3","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.", "130€");
let product3 = new Products("Images/camera/camera4.jpg", "Caméra 4","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.", "120€");
let product4 = new Products("Images/camera/camera5.jpg", "Caméra 5","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti.", "50€");
let product5 = new Products("Images/camera/camera6.jpg", "Caméra 6","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eleifend risus. Suspendisse potenti. ", "300€");

// Les instances sont regroupées dans un tableau //
let product = [product0, product1, product2, product3, product4, product5];

// Boucle pour parcourir le tableau et alimenter le HTML //
for (let i = 0; i < product.length; i++) {
    product[i].createProduct(this);
}