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
   const productPicture = document.querySelector("#description img");
   productPicture.src = product.imageUrl;
   const productName = document.querySelector("#description h2");
   productName.innerHTML = product.name;
   const productDescription = document.querySelector("#description p");
   productDescription.innerHTML = product.description;
   for (index in product.lenses){
       let option = `option${index}`;
       let productOption = document.getElementById("options");
        productOption.innerHTML += '<option value=" ' + option + ' " id=" ' + option + ' ">' + product.lenses[index] + '</option>'
   }
   const productPrice = document.getElementById("price");
   productPrice.innerHTML = product.price/100 + ' €';
}