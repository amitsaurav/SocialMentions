var express = require('express');
var path = require('path');
var twitterStream = require('./modules/twitter/twitter-stream');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/Mention');
var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, "static")));
  app.use(express.errorHandler({ dumpException: true, showStack: true }));
});

var Mention = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  image: {type: String },
  channel: {type: String, required: true },
  timeId: {type: Date, default: Date.now}
});
var MentionModel = mongoose.model('Mention', Mention);

/* Home page */
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/static/index.html');
});

var capture = function (userName, userText, userImage, channelName, socketName) {
  var newMention = new MentionModel({
    user: userName,
    text: userText,
    image: userImage,
    channel: channelName,
  });

  console.log("Created new mention: " + newMention.user + ", " + newMention.text + ", " + 
  	newMention.image + ", " + newMention.channel);
  newMention.save(function (err) {
  	if (!err) {
  	  console.log('Saved!');
  	} else {
  	  console.log('Error: ' + err);
  	}
  });
  socketName.emit('message', { message: JSON.stringify(newMention) });
};

var io = require('socket.io').listen(app.listen(3000));
io.sockets.on('connection', function (socket) {
  console.log('Connection established with client');
  twitterStream.stream("amazon", capture, socket);
});

console.log('listening on port 3000...');
