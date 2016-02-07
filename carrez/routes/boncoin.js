var http = require('http');
var htmlToJson = require("html-to-json");
var toLowerCase = require('to-lower-case');

module.exports = function (url, callback){
	downloadUrl(url, function(data){
		htmlToJson.parse(data,{
				'city' : function(doc){					
					var str = toLowerCase(doc.find('td[itemprop=addressLocality]').text());
					console.log(doc.find('td[itemprop=addressLocality]').text());
					return str;
			  	},
			  	'codeCity': function(doc){
			  		return doc.find('td[itemprop=postalCode]').text();
			  	},
			  	'price': function (doc) {
				    return doc.find('span[class=price]').attr('content').replace(/\s+/g,'');
			  	},
			  	'area':function(doc){
			  		return getArea(doc.find('div[class="lbcParams criterias"]')[0].children[1]).replace(/\s+/g,'');
			  	},
				'typeBien':function(doc){
			  		return doc.find('span[class="fine_print"]')[0].children[5].children[0].data.split(" ")[0];
				},
				'typeLogement':function(doc){
			  		return getType(doc.find('div[class="lbcParams criterias"]')[0].children[1])+"";
				},
				'imageBien': function(doc){
				return doc.find('div[class="images_cadre"]')[0].children[1].attribs.style.split(" ")[1].split("'")[1];
				}					
			}, function (err, result) {
				
				if(err)
					throw err;
				return callback(result);
			}
		);
	})
}
			
function downloadUrl(url,callback){ 
var dataResult ="";
	    	http.get(url, function(response)
						{
							response.setEncoding("utf8")  // language en quoi c'est traduit							
							response.on("data", function(data) // reception des donnees
													{
														dataResult +=data;	
													})
							response.on("end", function()  // quand c'est la fin on retourne la fonction 
												{
													return callback(dataResult);
												})
						})
    }

function getArea(element){
	var size = element.children.length;
	for(var i = 0;i < size;++i)
		if(element.children[1+(2*i)].children[1].children[0].data === "Surface : ")
			return element.children[1+(2*i)].children[3].children[0].data.split(' ')[0];
	return '';
}

function getType(element){
	var size = element.children.length;
	for(var i = 0;i < size;++i)
		if(element.children[1+(2*i)].children[1].children[0].data === "Type de bien : ")
			return element.children[1+(2*i)].children[3].children[0].data;
	return '';
}
