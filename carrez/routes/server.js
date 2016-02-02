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
	var prixAgent=0.0;

   boncoin(req.body.url, function (resultat) //name = nom de l'imput
   {		
	/*mAgents("/prix-immobilier/"+resultat.city+"-"+resultat.codeCity+"/#estimates" , function (result){
		
				
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

		
		if ( prixAgent > resultat.price)
		{
			console.log("BAD CHOICE");
		}
		else
			console.log("GOOD DEAL");
			   
		});		
		
		console.log(resultat);
		console.log(prixAgent);*/
		var city = resultat.city;		
		var bla = resultat.price;
		
		res.render('contact',{city:city, bla:bla});	
	});
});

module.exports = router;