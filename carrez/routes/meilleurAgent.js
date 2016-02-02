var http = require('http');
var htmlToJson = require("html-to-json");

var dataResult ="";

module.exports = function (url, callback){
	downloadUrl(url, function(data){
		htmlToJson.parse(data, {
			"priceFloat": function(doc){				
			var str = doc.find('div[class="prices-summary__values"]')[0].children[3].children[5].children[0].data.split(' ')[12].replace(/\s+/g,'');
			return str;
		},
			"priceHouse": function(doc){				
			var str = doc.find('div[class="prices-summary__values"]')[0].children[5].children[5].children[0].data.split(' ')[12].replace(/\s+/g,'');
					return str;
		},
			"priceRent": function(doc){				
			var str = doc.find('div[class="prices-summary__values"]')[0].children[7].children[5].children[0].data.split(' ')[12].replace(/\s+/g,'').replace(',','.');
					return str;
		}			
		
		}, function (err, result) {
				if(err)
					throw err;
				return callback(result);
			}
		);
	})
}

function getPriceHouse(result, information){
	var size = element.children.length;
	for(var i = 0;i < size;++i)
		if(element.children[3+(i*2)].children[1].data === "Prix m2 maison")
			return element.children[3+(i*2)].children[5].children[0].data.split(' ')[12];
	return '';
}

function getPriceFloat(element){
	var size = element.children.length;
	for(var i = 0;i < size;++i)
		if(element.children[3+(i*2)].children[1].data === "Prix m2 appartement")
			return element.children[3+(i*2)].children[3].children[0].data.split(' ')[12];
	return '';
}

function getPriceRent(element){
	var size = element.children.length;
	for(var i = 0;i < size;++i)
		if(element.children[3+(i*2)].children[1].data === "Loyer mensuel/m2")
			return element.children[3+(i*2)].children[5].children[0].data.split(' ')[12];
	return '';
}

function downloadUrl(url,callback){
	var option = { 
		hostname : 'www.meilleursagents.com',
		path : url,
		port : 80,
		headers:{
		'Cookie' : 'session=eyJ1c2VyX2lkIjoxMzgzMjcwLCJhbmFseXRpY3NfdGFncyI6W10sIl9mcmVzaCI6ZmFsc2UsIl9pZCI6IjVkMmJhYzViNDYwNzIzYjIyY2ExODMwYjNiMTM5YWQ0In0.CZI9QA.xU--fOh8HHucgiQUrRsbuC4oswU'
	}
	}
		http.get(option, function(response)
		{
			response.setEncoding("utf8")  // language en quoi c'est traduit
			response.on("data", function(data) // reception des donnees
				{
					dataResult += data;			
				})
			response.on("end", function()  // quand c'est la fin on retourne la fonction 
				{
					return callback(dataResult);
				})
		})
    }
