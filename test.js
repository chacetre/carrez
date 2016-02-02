var express = require('express');
var george = require('./meilleurAgent.js');
var boncoin = require('./boncoin.js');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('./public/javascripts'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET contact page. */
router.get('/contact', function(req, res) {
    res.render('contact');
});

/* POST contact page (submit). */
router.post('/contact', function(req, res) {
    res.render('contact', { name: req.param('name') });
});

app.get('/index.html', function (req, res) // permet d'afficher la page html
 {
   res.sendFile("index.html" );
})

app.post('/process_post', urlencodedParser ,function (req, res) // permet de faire une requete mais change de page donc pas bon
{
   boncoin(req.body.urlParser, function (resultat)
   {	
	/*george("http://www.meilleursagents.com/prix-immobilier/"+resultat.city+"-"+resultat.codeCity+"/#estimates" , function (resultat){
	 // faire des if en fonction des appartement maison et tout ca 
		
	var prixAgent = resultat.priceHouse * boncoin.surface;
	var prixBoncoin = boncoin.price;*/
	
	var prix = 300;	
	response = {
		
		"PriceBonCoin" :3000,
		"PriceAgence" : 50,
		"GoodDeal" : 10		
	};
	
	res.render('result', { prix: req.param('prix') });
	res.end(JSON.stringify(response)); 
			//})
	});
   
});

module.exports = router;