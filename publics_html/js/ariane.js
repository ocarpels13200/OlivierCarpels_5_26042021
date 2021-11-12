let ariane = document.title;
let arianeContainer = document.querySelectorAll('#arianeContainer li');
console.log(arianeContainer);
if(arianeContainer.length==1){
    let arianeContent = document.getElementById('ariane0');
    arianeContent.innerHTML = `${ariane}`;
}else{
    let arianeContent1 = document.getElementById('ariane0');
    let arianeContent2 = document.getElementById('ariane1');
    arianeContent1.innerHTML = `Orinoco - Accueil`;
    arianeContent2.innerHTML = `${ariane}`;
};