var twitCredentials = require('./credentials');
var twitter = require('ntwitter');

var twitterConnection = new twitter({
  consumer_key: twitCredentials.consumer_key,
  consumer_secret: twitCredentials.consumer_secret,
  access_token_key: twitCredentials.access_token_key,
  access_token_secret: twitCredentials.access_token_secret
});

var twitterStream = {
  stream: function (entity, saveCallback, socketName) {
    twitterConnection.stream('statuses/filter', {'track': entity}, function(stream) {
      console.log("Capturing tweets for: " + entity);
      stream.on('data', function (tweet) {
        if (tweet.user && tweet.user.screen_name && tweet.text && socketName) {
          saveCallback(tweet.user.screen_name, tweet.text, "twitter", socketName);
        }
      });
    });
  }
};

module.exports = twitterStream;
