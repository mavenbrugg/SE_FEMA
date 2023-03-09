// Include the http module
var http = require("http");
// Include the custom date/time module ("./" means in the same folder as this file)
var dt = require("./myfirstmodule.js");
// Include the url module
var url = require("url");


// create a server object:
// "req" is the request as an http.IncomingMessage object; "res" is the response to give
http.createServer(function(req, res) {
	// indicates that server should display html 
	// 200 is the status code that indicates okay
	res.writeHead(200, {"Content-Type": "text/html"}); 

	// display the part of the request url that comes after the domain name
	res.write(req.url);

	// get the year and month enterred after the domain name ("year=2023&month=March")
	var q = url.parse(req.url, true).query;
  	var txt = q.year + " " + q.month;
  	res.write(txt);
	
	// write a response to the client
	res.write("\nThe date and time are currently: " + dt.myDateTime()); 
	
	//end the response
	res.end("\nHello World!"); 
}).listen(8080); // the server object listens on port 8080