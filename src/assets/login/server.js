var http = require('http');
var fs = require("fs");
const url = require('url');
const querystring = require('querystring');

var servr = http.createServer(function(request, response) {

	let parsedUrl = url.parse(request.url);
	let jsonObject = querystring.parse(parsedUrl.query);

	var count = Object.keys(jsonObject).length;

	if(count==0){
		console.log("Requested URL is: Yoouou" + request.url);
		// response.end();
		sendFileContent(response, "login.html", "text/html");
	}
	else if (count>0){
			console.log("checking the url: " + request.url);
			//console.log(jsonObject);
			//console.log(count);
			receivePar(jsonObject,response);

	}
	else{
		console.log("Bad!!!!!!Requested URL is: " + request.url);
		response.end();
	}
});
servr.listen(1000);



function sendFileContent(response, fileName, contentType){
	console.log(fileName);
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType,'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'});
			response.write(data);
		}
		response.end();
	});
	//servr.close();
}
function receivePar(json_,response){
	console.log("checking the method:  "+json_.method);
	/*if (json_.location=="Paris"){
		console.log("Paris");
		sendFileContent(response, "indexP.html", "text/html");
	}
	else if (json_.location=="London"){
		console.log("London");
		sendFileContent(response, "indexL.html", "text/html");
	}
	else if (json_.location=="Beijing"){
		console.log("Beijing");
		sendFileContent(response, "indexB.html", "text/html");
	}
	else if (json_.location=="Sydney"){
		console.log("Sydney");
		sendFileContent(response, "indexS.html", "text/html");
	}
	else if (json_.location=="Tokyo"){
		console.log("Tokyo");
		sendFileContent(response, "indexT.html", "text/html");
	}*/
	

}
