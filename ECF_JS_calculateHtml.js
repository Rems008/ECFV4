let op1 = ""; // opérande 1
let op2 = ""; // opérande 2
let oper = ""; // operateur
let resultat = ""; // résultat du calcul
/**
 * fonction appelée sur un click d'un des boutons de la calculate
 * @param {Event} event
 */
function btnClick(event) {
  let touche = event.target.textContent; // récupération du contenu de la balise button cliquée

  if (touche === "C") {
    // on efface l’affichage en appeler la fonction btnClear()
    btnClear();
  } else {
    boutons[0].disabled = false; // bouton C cliquable

    if (touche === "=") {
      resultat = effectuerCalcul(op1, op2, oper); // effectuer le calcul
      op1 = resultat; // transfert dans op1 pour affichage
      op2 = ""; // effacer op1
      oper = ""; // effacer oper

      boutons[boutons.length - 1].disabled = true; // bouton = non-cliquable
    } else {
      if (
        touche === "+" ||
        touche === "-" ||
        touche === "x" ||
        touche === "/"
      ) {
        if (op1 !== "") {
          // touche non autorisée si op1 est vide
          oper = "" + touche + "";
        }
      } else {
        if (resultat === "" || oper !== "") {
          // cas d'un deuxième calcul après le premier
          if (oper === "") {
            op1 += touche;
          } else {
            op2 += touche;
          }
        }
      }
    }
  }
  if (op1 !== "" && op2 !== "" && oper !== "") {
    // cas d'un deuxième calcul après le premier
    boutons[boutons.length - 1].disabled = false; // bouton = cliquable
  }

  // envoi des 3 variables dans l'input text du resultat
  document.querySelector("input").value = op1 + oper + op2;
}

/**
 * fonction de remise à zéro des 4 variables globales
 * et effacement de l-input résultat
 */
function btnClear() {
  op1 = "";
  op2 = "";
  oper = "";
  resultat = "";

  boutons[0].disabled = true; // Bouton C non-cliquable
  boutons[boutons.length - 1].disabled = true; // bouton = non-cliquable
  boutons[1].disabled = false; // Bouton + cliquable
  boutons[5].disabled = false; // Bouton - cliquable
  boutons[9].disabled = false; // Bouton x cliquable
  boutons[13].disabled = false; // Bouton / cliquable
}

/**
 * fonction de calcul du résultat
 * @param {Number} operande1
 * @param {Number} operande2
 * @param {String} operateur
 * @returns {Number}
 */
function effectuerCalcul(operande1, operande2, operateur) {
  let resultat = 0;

  // selon operateur faire le bon calcul dans resultat
  switch (operateur) {
    case "+":
      resultat = Number(operande1) + Number(operande2);
      break;
    case "-":
      resultat = Number(operande1) - Number(operande2);
      break;
    case "x":
      resultat = Number(operande1) * Number(operande2);
      break;
    case "/":
      if (operande2 == 0) {
        resultat = "erreur";

        boutons[1].disabled = true; // Bouton + non-cliquable
        boutons[5].disabled = true; // Bouton - non-cliquable
        boutons[9].disabled = true; // Bouton x non-cliquable
        boutons[13].disabled = true; // Bouton / non-cliquable
      } else {
        resultat = Number(operande1) / Number(operande2);
      }
      break;
  }
  return resultat; // retourner le resultat
}
function init() {
  // la balise input pour l'affichage du résultat est dans une div de classe "resultat"
  // chaque balise button est dans une div de classe "bouton"
  // déclaration d'un tableau des codes de touche
  let codeTouches = [
    "C",
    "",
    "",
    "+",
    "7",
    "8",
    "9",
    "-",
    "4",
    "5",
    "6",
    "x",
    "1",
    "2",
    "3",
    "/",
    "0",
    "",
    ".",
    "=",
  ];
  // création du html pour l'affichage et les boutons
  let divs =
    '<div class="resultat"><input type="text" readonly="readonly" value=""/></div>';
  for (let codeTouche of codeTouches) {
    if (codeTouche === "") {
      // pas de bouton
      divs += '<div class="bouton"></div>';
    } else {
      divs += '<div class="bouton"><button>' + codeTouche + "</button></div>";
    }
  }
  // envoi de ce code html dans la div
  document.querySelector('div[class="grid-calculate calculate"]').innerHTML =
    divs;

  // récupération de tout les boutons pour leur assigner le gestionnaire d'évènement click
  boutons = document.querySelectorAll("button");
  for (let bouton of boutons) {
    bouton.onclick = btnClick;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  init();
  boutons[0].disabled = true; // Bouton C non-cliquable
  boutons[boutons.length - 1].disabled = true; // Bouton = non-cliquable
  document.querySelector("input").value = 0; // envoi des 0 dans l'input text du resultat
});
