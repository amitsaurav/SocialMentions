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
        if (tweet.user && tweet.user.screen_name && tweet.text && socketName && tweet.lang === "en") {
          // find out which attribute is user profile pic
          saveCallback(tweet.user.screen_name, tweet.text, tweet.user.profile_image_url, "twitter", socketName);
          console.log(tweet);
        }
      });
    });
  },

  _stream: function (entity, saveCallback, socketName) {
    setInterval(saveCallback, 1000, "amit", "this is awesome tweet",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACtUlEQVR4Xu2Y20tqURDGPzMqrBCEBJXqJRPJFAUJvID4n3vJIm9QIAqJPgjii0KY2tXON6B4OKfAbbUfnHmRvXXNWvPN5YfL0u/3p1hjs6gAWgHaAjoD1ngGQoegUkApoBRQCigF1lgBxaBiUDGoGFQMrjEE9M+QYlAxqBhUDCoGFYNrrMDKGGw0Guh2u5hOp3C5XPD5fLBYLHNJ/1AGtVoNNpsN4XD4r+8+0/0nfH6210oC1Ot1dDodbG5uiv/X11ccHx/D6/XKM0XJZDLyfmtrC4lEAhsbG1/W20/4/GpDwwK8vb0hm81KRpPJJF5eXtBut7G/vw+PxyN73t/fyzvazs4O4vE4Hh8fcXt7C6vVikgkguFwCAa9vb2N8/Nz5PP5pX0uVtyy3WxYgOfnZzns+/u7BD2ZTKQFTk9P5Qzj8RiXl5c4OjrCw8MDRqORCMXDlstlDAYDOBwOWcfvWDVcb9TnsoHPfm9YAPZ2pVIRP2wBljmNQZydnaFYLEp2U6kUbm5u8PT0NBdgUTyusdvtiEajWMXnrwvADBcKBSndWCwmWby+vpZeDwaDKJVK2N3dxeHhIZrNplTKycmJPNNarZa8p11cXEgVrerTiAiGK4AZ5wxgb1OA2TMF8Pv9qFar/5yHAzCdToPzI5fLzavm4OAAoVBo7sOITyPBc41hATjhWQHMmtvtlk/2tdPpRCAQAMucxqDZDhSImWZwd3d36PV62Nvbk8phdXAAcq1Rn78uADfkALu6upKM0tgO7GUGuWhsDQpACnAgUpAZPSgEuc85MqPJsj5NocBigBx2NGb0u+wnfP7vbIZb4LsCNduPCqA3QnojpDdCeiNk9iQ2c3+lgFJAKaAUUAqYOYXN3lspoBRQCigFlAJmT2Iz91cKKAWUAkoBpYCZU9jsvZUC606BDwz4jZ+RGtXxAAAAAElFTkSuQmCC",
      "twitter", socketName);
  }
};

module.exports = twitterStream;
