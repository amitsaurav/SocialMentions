var express = require('express');
var path = require('path');
var twitterStream = require('./modules/twitter/twitter-stream');
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

var capture = function (userName, userText, channelName, socketName) {
  var newMention = {
    user: userName,
    text: userText,
    channel: channelName
  };

  console.log("Created new mention: " + newMention.user + ", " + newMention.text + ", " + newMention.channel);
  socketName.emit('message', { message: JSON.stringify(newMention) });
};

var io = require('socket.io').listen(app.listen(3000));
io.sockets.on('connection', function (socket) {
  console.log('Connection established with client');
  twitterStream.stream("Amazon", capture, socket);
});

console.log('listening on port 3000...');
