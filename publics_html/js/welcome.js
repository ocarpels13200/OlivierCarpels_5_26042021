let identifiant=document.getElementById('identifiant');
    identifiant.addEventListener("change", function(){
    let prenomNom = identifiant.value;
    let welcome = document.getElementById('welcome');
    welcome.innerHTML =`Bienvenue <strong>${prenomNom}</strong`;
    welcome.style.color = "black";
    welcome.style.fontSize = "small"
});