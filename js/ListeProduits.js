import CarteProduit from "./CarteProduit.js";
import { ajouter, retirer } from "./FonctionsUtils.js";

export default class ListeProduit {
    constructor(pictures) {
        this.carteProduits = [];
        for (const picture of pictures) {
            this.carteProduits.push(
                new CarteProduit(picture.id, picture.nom, picture.prix, picture.categorie, picture.url)
            );
        }
    }

    trouver(id) {
        return this.carteProduits.find((carte) => carte.id === id);
    }

    rendre() {
        let rendu = "";
        for (const carteProduit of this.carteProduits) {
            rendu += carteProduit.rendre();
        }

        return `<div class="liste_produits">${rendu}</div>`;
    }

    actualiser() {
        for (const carte of this.carteProduits) {
            const compteurs = document.querySelectorAll(`[data-quantite="${carte.id}"]`);
            for (const compteur of compteurs) {
                compteur.textContent = carte.quantite;
            }
        }
    }

    activerBoutons(surChangement) {
        document.addEventListener("click", (evenement) => {
            const bouton = evenement.target.closest("button[data-action]");
            if (!bouton) return;

            const carte = this.trouver(Number(bouton.dataset.id));

            if (bouton.dataset.action === "ajouter") {
                ajouter(carte);
            } else {
                retirer(carte);
            }

            surChangement();
        });
    }
}