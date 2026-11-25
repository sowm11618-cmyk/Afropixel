import pictures from "./pictures.json" with { type: "json" };
import ListeProduit from "./js/ListeProduit.js";
import Panier from "./js/Panier.js";

const liste_produits = new ListeProduit(pictures);
const panier = new Panier(liste_produits);

document.body.innerHTML += liste_produits.rendre() + panier.rendre();

function actualiser() {
    liste_produits.actualiser();
    panier.actualiser();
}

liste_produits.activerBoutons(actualiser);
panier.activerOuverture();
actualiser();