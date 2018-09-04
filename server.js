var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url).pathname;

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
   
   
   //check if the user is looking for /listings
   if( parsedUrl == '/listings' ){
        //return data
    }
	//otherwise throw a personal 404
    else{
		response.writeHead(404, {"Content-type": "text/plain"});
		response.write("404 Not found!");
	}
   
   response.end();		//close response
};

fs.readFile('listings.json', 'utf8', function(err, data) {
	
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
   
	/*https://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-object-into-server-memory*/
	if (err) throw err;
	listingData = JSON.parse(data);		//save data in listingData
	
	//define and start the server
	var server = http.createServer(requestHandler);
	server.listen(port, function() {
		//the server is now listening
	});
});
