import pictures from "../pictures.json" with { type: "json" };
import {ListeProduit} from "./ListeProduit.js";

const liste_produits = new ListeProduit(pictures);

document.body.innerHTML += liste_produits.rendre();