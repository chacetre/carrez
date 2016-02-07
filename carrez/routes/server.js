var express = require('express');
var mAgents = require('./meilleurAgent.js');
var boncoin = require('./boncoin.js');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname +'../public'));

/* GET home page. */

router.get('/', function(req, res) {
	res.render('contact');
  //res.sendFile("index.html");
});


router.post('/',function (req, res)
{	
	

   boncoin(req.body.url, function (resultat) //name = nom de l'imput
   {	
    var prixAgent=0.0;
	var Gdeal = "test";	
	var Bdeal =" ";
	mAgents("/prix-immobilier/"+resultat.city+"-"+resultat.codeCity+"/#estimates" , function (result){
		
		var typeBien = resultat.typeLogement;
		var city = resultat.city;
		var price = resultat.price;
		var codeCity= resultat.codeCity;
		var image = resultat.imageBien;
				
		if(resultat.typeBien === "Ventes")
			{
				if(resultat.typeLogement === "Appartement")
					{
						prixAgent = parseFloat(result.priceFloat)*parseFloat(resultat.area);
						console.log('test');
					}
				if(resultat.typeLogement ==="Maison")
					{
						prixAgent = parseFloat(result.priceHouse)*parseFloat(resultat.area);			
					}									
			}
			if(	resultat.typeBien === "Locations")
			{
				prixAgent = parseFloat(result.priceRent)*parseFloat(resultat.area);
			}		
			if ( prixAgent <= resultat.price)
			{
				console.log("BAD CHOICE");
				Bdeal = "BAD CHOICE";
				
				res.render('contact',{city:city, Bdeal:Bdeal, price:price, typeBien:typeBien, prixAgent:prixAgent,codeCity:codeCity,image:image});
			}
			else
			{
				console.log("GOOD DEAL");
				Gdeal = "GOOD DEAL ";
				res.render('contact',{city:city, Gdeal:Gdeal, price:price, typeBien:typeBien, prixAgent:prixAgent,codeCity:codeCity,image:image});
			} 
			
			
			console.log(result);
			
				
		});
		console.log(resultat);
	});
});

module.exports = router;