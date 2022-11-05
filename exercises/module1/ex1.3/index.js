
let compteur = 0;
let body = document.querySelector("body")
let compteurVisuel = document.querySelector("#compteur")
let message = document.querySelector("#message")
window.addEventListener('click', incrementerCompteur)


function incrementerCompteur(){
    compteur++;
    console.log(compteur);
    compteurVisuel.textContent = compteur;
    if(compteur >= 5 && compteur <= 9){
        message.textContent = "Bravo, bel échauffement !";
    }else if (compteur >= 10){
        message.textContent = "Vous êtes passé maître en l'art du clic !";
    }
}
