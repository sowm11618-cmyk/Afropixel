const blocImg       = document.getElementById("blocImg");
const ouvrir_panier = document.getElementById("ouvrir_panier");
const fond_panier   = document.getElementById("fond_panier");
const fermer_panier = document.getElementById("fermer_panier");
const liste_panier  = document.getElementById("liste_panier");
const total_quantite = document.getElementById("total_quantite");
const montant_total = document.getElementById("montant_total");

let images = [];

let panier = JSON.parse(localStorage.getItem("panier")) || {};

function formaterPrix(prix) {
    return prix.toLocaleString("fr-FR") + " CFA";
}

function QuantiteImages(id) {
    return panier[id] || 0;
}

function ajouterAuPanier(id) {
    panier[id] = QuantiteImages(id) + 1;
    actualiser();
}

function retirerAuPanier(id) {
    if (QuantiteImages(id) > 0) {
        panier[id] = QuantiteImages(id) - 1;
    }
    if (QuantiteImages(id) === 0) {
        delete panier[id];
    }
    actualiser();
}

function creerCommandes(image) {
    const commandes = document.createElement("div");
    commandes.className = "commandes";

    const BouttonPlus = document.createElement("button");
    BouttonPlus.textContent = "+";
    BouttonPlus.addEventListener("click", function () {
        ajouterAuPanier(image.id);
    });

    const quantite = document.createElement("span");
    quantite.className = "quantite";
    quantite.textContent = QuantiteImages(image.id);

    const BouttonMoins = document.createElement("button");
    BouttonMoins.textContent = "-";
    BouttonMoins.addEventListener("click", function () {
        retirerAuPanier(image.id);
    });

    commandes.appendChild(BouttonPlus);
    commandes.appendChild(quantite);
    commandes.appendChild(BouttonMoins);

    return commandes;
}

function afficherCarte() {
    blocImg.innerHTML = "";

    for (const image of images) {
        const carte = document.createElement("div");
        carte.className = "images";

        const photo = document.createElement("img");
        photo.src = image.url;
        photo.alt = image.nom;

        const nom = document.createElement("p");
        nom.textContent = image.nom;

        const prix = document.createElement("p");
        prix.textContent = formaterPrix(image.prix);

        carte.appendChild(photo);
        carte.appendChild(nom);
        carte.appendChild(prix);
        carte.appendChild(creerCommandes(image));

        blocImg.appendChild(carte);
    }
}

function AfficherPanier() {
    liste_panier.innerHTML = "";

    let QuantiteTotal = 0;
    let PrixTotal = 0;

    for (const image of images) {
        const quantite = QuantiteImages(image.id);

        QuantiteTotal += quantite;
        PrixTotal += image.prix * quantite;

        if (quantite > 0) {
            const article = document.createElement("div");
            article.className = "article-panier";

            const photo = document.createElement("img");
            photo.src = image.url;
            photo.alt = image.nom;

            const infosImage = document.createElement("div");
            infosImage.className = "infos-article";

            const nom = document.createElement("p");
            nom.textContent = image.nom;

            const prix = document.createElement("p");
            prix.textContent = formaterPrix(image.prix);

            const CoutTotal = document.createElement("p");
            CoutTotal.textContent = "Sous-total : " + formaterPrix(image.prix * quantite);

            infosImage.appendChild(nom);
            infosImage.appendChild(prix);
            infosImage.appendChild(CoutTotal);

            article.appendChild(photo);
            article.appendChild(infosImage);
            article.appendChild(creerCommandes(image));

            liste_panier.appendChild(article);
        }
    }

    if (QuantiteTotal === 0) {
        const message = document.createElement("p");
        message.className = "panier-vide";
        message.textContent = "Le panier est vide";
        liste_panier.appendChild(message);
    }

    total_quantite.textContent = QuantiteTotal;
    montant_total.textContent = formaterPrix(PrixTotal);
    afficherCompteur(QuantiteTotal);
}

const compteur = document.createElement("span");
compteur.className = "compteur";
ouvrir_panier.appendChild(compteur);

function afficherCompteur(total) {
    compteur.textContent = total;

    if (total === 0) {
        compteur.classList.add("cache");
    } else {
        compteur.classList.remove("cache");
    }
}

function actualiser() {
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherCarte();
    AfficherPanier();
}

ouvrir_panier.addEventListener("click", function () {
    fond_panier.classList.add("actif");
});

fermer_panier.addEventListener("click", function () {
    fond_panier.classList.remove("actif");
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        fond_panier.classList.remove("actif");
    }
});

async function demarrer() {
    const reponse = await fetch("pictures.json");
    images = await reponse.json();
    actualiser();
}

demarrer();