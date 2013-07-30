$(function() {
  var socket = io.connect('http://localhost:3000');
  var mentionContainer = $('.container');
  var mentionCount = 0;

  socket.on('message', function (data) {
    if(data.message) {
      console.log(data.message);
      addMention(JSON.parse(data.message), mentionCount++);
    } else {
      console.info("There is a problem:", data);
    }
  });

  var addMention = function (mention, mentionCount) {
    mentionContainer.prepend(getMentionMarkup(mention, mentionCount));
    $('#mention_' + mentionCount).linkify({
      target: "_blank",
      hashtagUrlBuilder: toHashTagUrl,
      usernameUrlBuilder: toUsernameUrl
    });
  };

  var toHashTagUrl = function (hashTag) {
    return "https://twitter.com/search?src=hash&q=" + hashTag;
  };

  var toUsernameUrl = function (username) {
    return "https://twitter.com/" + username;
  }

  var getMentionMarkup = function (mention, mentionCount) {
    var markup = '<div class="mention">';
    markup +=      '<div class="media well">';
    markup +=        '<a class="pull-left" href="#">';
    markup +=          '<img class="media-object mentionImg" alt="' + mention.user + '" src="' + mention.image + '" />';
    markup +=        '</a>';
    markup +=        '<div class="media-body" id="mention_' +  mentionCount +'">' + mention.text + '</div>';
    markup +=      '</div>'
    markup +=    '</div>';

    return markup;
  };
});
