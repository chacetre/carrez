//var george = require('./meilleurAgent.js');
var boncoin = require('./boncoin.js');

boncoin("http://www.leboncoin.fr/ventes_immobilieres/918733253.htm?ca=5_s", function (resultat){
	console.log(resultat);
});

//TODO recuprer les info le bon coin
/*george("http://www.meilleursagents.com/prix-immobilier/chalon-sur-saone-71100/#estimates" , function (resultat){
	console.log(resultat);
	// la on fait les calculs 
	
	var prixTotal = resultat * leboncoin.surface;
	// je met le prix total dans la balise.
	
});*/