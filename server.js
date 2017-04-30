"user strict";

var express = require('express');
var app = express();

// set port
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/:id', function (req, res) {

  var timestamp = decodeURIComponent(req.params.id);

  var dateUnix;
  var dateNatural;
  
  if (!isNaN(timestamp)){
    timestamp = parseInt(timestamp);
    dateUnix = timestamp;
  } else {
    dateUnix = Date.parse(timestamp);
  }
  
  dateNatural = (new Date(timestamp)).toString();
  
  var output = {};
  
  if (dateNatural == 'Invalid Date'){
    output.unix = null;
    output.natural = null;
  } else {
    output.unix = dateUnix;
    output.natural = dateNatural.substring(4,15);
  }
  
  console.log(JSON.stringify(output));
  res.json(output);
  
});

app.listen(port, function () {
  console.log('Example app listening on port '+port);
})