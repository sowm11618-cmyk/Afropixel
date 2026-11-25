import { formaterPrix } from "./FonctionsUtils.js";

export default class CarteProduit {
    constructor(id, nom, prix, categorie, url) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.categorie = categorie;
        this.url = url;
        this.quantite = 0;
    }
    rendre() {
        return `
            <div class="forme_carte_produit">
                <img class="image_produit" src="${this.url}" alt="${this.nom}">
                <div>${this.nom}</div>
                <div>${formaterPrix(this.prix)}</div>
                <div class="div_actions">
                    <button data-id="${this.id}" data-action="ajouter">+</button>
                    <span class="quantite" data-quantite="${this.id}">${this.quantite}</span>
                    <button data-id="${this.id}" data-action="retirer">-</button>
                </div>
            </div>
        `;
    }
}