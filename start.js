var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, "static")));
  app.use(express.errorHandler({ dumpException: true, showStack: true }));
});

/* Home page */
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/static/index.html');
});

app.listen(3000);
console.log('listening on port 3000...');
