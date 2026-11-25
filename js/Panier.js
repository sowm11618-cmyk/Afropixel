import {formaterPrix} from "./FonctionsUtils.js";

export default class Panier {
    constructor(liste) {
        this.liste = liste;
        this.charger();
    }
    charger() {
        const sauvegarde = JSON.parse(localStorage.getItem("panier")) || {};
        for (const carte of this.liste.carteProduits) {
            carte.quantite = sauvegarde[carte.id] || 0;
        }
    }
    sauvegarder() {
        const sauvegarde = {};
        for (const carte of this.articles()) {
            sauvegarde[carte.id] = carte.quantite;
        }
        localStorage.setItem("panier", JSON.stringify(sauvegarde));
    }
    articles() {
        const resultat = [];
        for (const carte of this.liste.carteProduits) {
            if (carte.quantite > 0) {
                resultat.push(carte);
            }
        }
        return resultat;
    }
    quantiteTotale() {
        let total = 0;
        for (const carte of this.liste.carteProduits) {
            total += carte.quantite;
        }
        return total;
    }
    montantTotal() {
        let total = 0;
        for (const carte of this.liste.carteProduits) {
            total += carte.prix * carte.quantite;
        }
        return total;
    }
    rendreArticle(carte) {
        return `
            <div class="article-panier">
                <img src="${carte.url}" alt="${carte.nom}">
                <div class="infos-article">
                    <div>${carte.nom}</div>
                    <div>${formaterPrix(carte.prix)}</div>
                    <div>Sous-total : ${formaterPrix(carte.prix * carte.quantite)}</div>
                </div>
                <div class="div_actions">
                    <button data-id="${carte.id}" data-action="ajouter">+</button>
                    <span class="quantite" data-quantite="${carte.id}">${carte.quantite}</span>
                    <button data-id="${carte.id}" data-action="retirer">-</button>
                </div>
            </div>
        `;
    }
    rendreArticles() {
        const articles = this.articles();
        if (articles.length === 0) {
            return `<div class="panier-vide">Le panier est vide</div>`;
        }
        return articles.map((carte) => this.rendreArticle(carte)).join("");
    }
    rendre() {
        return `
            <div id="fond_panier" class="fond_panier">
                <div class="contenu_panier">
                    <div class="entete_panier">
                        <h2>Mon panier</h2>
                        <button id="fermer_panier">Retour aux produits</button>
                    </div>

                    <div id="liste_panier">${this.rendreArticles()}</div>

                    <div class="total_panier">
                        <div>Nombre d'images : <strong id="total_quantite">${this.quantiteTotale()}</strong></div>
                        <div>Montant total : <strong id="montant_total">${formaterPrix(this.montantTotal())}</strong></div>
                    </div>
                </div>
            </div>
        `;
    }
    actualiser() {
        document.getElementById("liste_panier").innerHTML = this.rendreArticles();
        document.getElementById("total_quantite").textContent = this.quantiteTotale();
        document.getElementById("montant_total").textContent = formaterPrix(this.montantTotal());

        const compteur = document.getElementById("compteur");
        compteur.textContent = this.quantiteTotale();
        compteur.classList.toggle("cache", this.quantiteTotale() === 0);
        this.sauvegarder();
    }
    activerOuverture() {
        const fond = document.getElementById("fond_panier");
        document.addEventListener("click", (evenement) => {
            if (evenement.target.closest("#ouvrir_panier")) {
                fond.classList.add("actif");
            }
            if (evenement.target.closest("#fermer_panier")) {
                fond.classList.remove("actif");
            }
        });
        document.addEventListener("keydown", (evenement) => {
            if (evenement.key === "Escape") {
                fond.classList.remove("actif");
            }
        });
    }
}