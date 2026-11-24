import pictures from "../pictures.json" with { type: "json" };

class CarteProduit {
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

class ListeProduit {
    constructor(pictures) {
        this.carteProduits = [];
        for (const picture of pictures) {
            this.carteProduits.push(
                new CarteProduit(picture.id, picture.nom, picture.prix, picture.categorie, picture.url)
            );
        }
    }

    rendre() {
        let rendu = "";
        for (const carteProduit of this.carteProduits) {
            rendu += carteProduit.rendre();
        }

        return `<div class="liste_produits">${rendu}</div>`;
    }
}

const liste_produits = new ListeProduit(pictures);

document.body.innerHTML += liste_produits.rendre();