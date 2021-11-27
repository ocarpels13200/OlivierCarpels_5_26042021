let documentURL = document.location.search.substring(4);
let currentProduct = {};

fetch("http://localhost:3000/api/cameras/" + documentURL)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        currentProduct = value;
        objectDescription(value);
    })
    .catch(function(err) {
        console.log(err);
    });

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

let addBasket = document.getElementById("addBasket");
addBasket.addEventListener("click", ev => {
    currentProduct.quantity = document.querySelector('#quantite').value;
    console.log("quantite1 :" + document.querySelector('#quantite').value);
    localStorage.setItem("product", JSON.stringify(currentProduct));
});
