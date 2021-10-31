// Création d'une classe product comprenant l'image, la description et le prix de chaque produit //
class products{
    constructor(descriptionLine1,descriptionLine2,descriptionLine3,money){
        this.descriptionLine1 = descriptionLine1;
        this.descriptionLine2 = descriptionLine2;
        this.descriptionLine3 = descriptionLine3;
        this.money = money;
    }
}
// Création des instances de classe -> produits //
let product0 = new products("Appareil photo de la marque Kodak.", "Avec son étui compact attachée à une cordelette.", "Notons que l'appareil photos quelques traces d'usure usuelle.", "150€");
let product1 = new products("projecteur en métal et plastique Bell et howell.", "Couleur: Multicolore.", "Dimensions: 29 x 33 x 31 cm", "200€");
let product2 = new products("Caméra Keystone 8mm", "matière plastique et métal.", "Couleur: Multicolore.", "130€");
let product3 = new products("Caméra vintage Gaf 714 auto Zoom super 8 et sa sacoche.", "Objectif: 1,8 / 9 - 36 mm", "Exposition automatique.", "120€");
let product4 = new products("Polaroid 600 - One Step 600 - Caméra film instantanée.", "Polaroid spirit 600.", "Couleur: Multicolore.", "50€");
let product5 = new products("fujica single-8p2 camera 8mm", "en bon état.", "Dimensions: 5 x 15 x 23 cm", "300€");

// Les instances sont regroupées dans un tableau //
let product = [product0, product1, product2, product3, product4, product5];

// Boucle pour parcourir le tableau et alimenter le HTML //
for (let i = 0; i < 6; i++){
    
    // Variables servant à se repérer dans le code HTML ID //
    let description = `description${i}`
    let price = `price${i}`;

    // Variables servant à construire le texte de la description à injecter dans le code HTML //
    let line1 = product[i]['descriptionLine1'];
    let line2 = product[i]['descriptionLine2'];
    let line3 = product[i]['descriptionLine3'];

    // Variable servant à construire le prix du produit à injecter dans le code HTML //
    let euro  = product[i]['money'];

    // Recherche des ID dans le HTML et injection des textes //
    let productDescription = document.getElementById(description);
    productDescription.innerHTML = `${line1}<br>${line2}<br>${line3}`;
    let productPrice = document.getElementById(price);
    productPrice.innerHTML = `${euro}`;

}
