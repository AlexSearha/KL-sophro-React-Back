const sanitize = require('sanitize-html');


/// On exporte un middleware qui servira de filtre pour nettoyer les données reçues.
module.exports = (req, _, next) => {
  if(req.body){
    // Dans la classe Object il existe 3 méthodes permettant de transformer un objet en tableau
    // Object.keys qui fourni toutes les propriété de 1er niveau dans un tableau
    // Object.values qui fourni toutes le valeurs sous forme de tableau
    // Object.entries qui fourni les propriété ET les valeurs sous forme de tableau de tuples (Tableau a 2 éléments) qui contiennet la propriété et sa valeur
    //console.log(Object.entries(req.body));
    Object.entries(req.body).forEach(([prop, value]) => {
      // Je refourni a chaque propriété sa valeur MAIS filtré par sanitize
      req.body[prop] = sanitize(value);
    });
  }
  next();
}