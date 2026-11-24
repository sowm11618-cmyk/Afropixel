function formaterPrix(prix) {
    return prix.toLocaleString("fr-FR") + " CFA";
}

function creerCarte(image) {
    let quantite = 0;

    const carte = document.createElement("div");
    carte.className = "images";

    const photo = document.createElement("img");
    photo.src = image.url;
    photo.alt = image.nom;

    const nom = document.createElement("p");
    nom.textContent = image.nom;

    const prix = document.createElement("p");
    prix.textContent = formaterPrix(image.prix);

    const commandes = document.createElement("div");
    commandes.className = "commandes";

    const boutonPlus = document.createElement("button");
    boutonPlus.textContent = "+";

    const affichageQuantite = document.createElement("span");
    affichageQuantite.className = "quantite";
    affichageQuantite.textContent = quantite;

    const boutonMoins = document.createElement("button");
    boutonMoins.textContent = "-";

    boutonPlus.addEventListener("click", function () {
        quantite++;
        affichageQuantite.textContent = quantite;
    });

    boutonMoins.addEventListener("click", function () {
        if (quantite > 0) {
            quantite--;
        }
        affichageQuantite.textContent = quantite;
    });

    commandes.append(boutonPlus, affichageQuantite, boutonMoins);
    carte.append(photo, nom, prix, commandes);

    return carte;
}

async function demarrer() {
    const reponse = await fetch("pictures.json");
    const images = await reponse.json();

    for (const image of images) {
        blocImg.appendChild(creerCarte(image));
    }
}

demarrer();