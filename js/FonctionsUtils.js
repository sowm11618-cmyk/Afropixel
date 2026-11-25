export function formaterPrix(prix) {
    return prix.toLocaleString("fr-FR") + " CFA";
}
export function ajouter(carte) {
    carte.quantite++;
}
export function retirer(carte) {
    if (carte.quantite > 0) {
        carte.quantite--;
    }
}