var express = require("express");
var http = require("http");
var https = require("https");
var app = express();

app.all("*", function(req, res, next) {
    var lat=req.query.lat;
    var lon=req.query.lon;
    var appid=req.query.appid;
    var callback=req.query.callback;
    console.log(appid);
    var options = 'http://api.openweathermap.org'+'/data/2.5/weather?lat='+lat+'&lon='+lon+'&callback='+callback+'&appid='+appid;
    getM(options,function(output){
        res.write(output);
        res.end();        
    });
});

function getM(options,callback) {

    http.get(options, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            callback(body);
        });
    });

}
http.createServer(app);
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

