const prix = 25000;
let quantite = 0;

const boutonPlus = document.getElementById("plus");
const boutonMoins = document.getElementById("moins");
const affichageQuantite = document.getElementById("quantite");

function actualiser() {
    affichageQuantite.textContent = quantite;
}
boutonPlus.addEventListener("click", function () {
    quantite++;
    actualiser();
});
boutonMoins.addEventListener("click", function () {
    if (quantite > 0) {
        quantite--;
    }
    actualiser();
});
