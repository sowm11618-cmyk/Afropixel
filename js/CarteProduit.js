export class CarteProduit {
    constructor(id, nom, prix, categorie, url) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.categorie = categorie;
        this.url = url;
    }

    rendre() {
        return `
            <div class="forme_carte_produit">
                <img class="image_produit" src="${this.url}" alt="${this.nom}">
                <div>${this.nom}</div>
                <div>${this.prix.toLocaleString("fr-FR")} CFA</div>
                <div class="div_actions">
                    <button>+</button>
                    <button>-</button>
                </div>
            </div>
        `;
    }
}