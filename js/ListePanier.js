import {formaterPrix} from "./FonctionsUtils.js";

export default class ListePanier {
    constructor(carteProduits) {
        this.carteProduits = carteProduits;
    }
    rendreLigne(carteProduit, quantite) {
        const sousTotal = formaterPrix(carteProduit.prix * quantite);
        return `
            <div class="article_panier">
                <img src="${carteProduit.url}" alt="${carteProduit.nom}">
                <div class="infos_article">
                    <p>${carteProduit.nom}</p>
                    <p>${formaterPrix(carteProduit.prix)}</p>
                    <p>Sous-total : ${sousTotal}</p>
                </div>
                <div class="div_actions">
                    <button data-action="ajouter" data-id="${carteProduit.id}">+</button>
                    <span class="quantite">${quantite}</span>
                    <button data-action="retirer" data-id="${carteProduit.id}">-</button>
                </div>
            </div>
        `;
    }
    rendre(panier) {
        let rendu = "";
        for(const carteProduit of this.carteProduits) {
            const quantite = panier.quantite(carteProduit.id);
            if (quantite > 0) {  
                rendu += this.rendreLigne(carteProduit,quantite);
            }
        }
        if(rendu === "") {
            rendu = `<p class="panier_vide">Le panier est vide.</p>`;
        }
        return rendu;
    }
}