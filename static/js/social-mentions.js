$(function() {
  var socket = io.connect('http://localhost:3000');

  socket.on('message', function (data) {
    if(data.message) {
      console.log(data.message);
      var mention = JSON.parse(data.message);
      $('.container').prepend(getMentionMarkup(mention));
    } else {
      console.info("There is a problem:", data);
    }
  });

  var getMentionMarkup = function (mention) {
    var markup = '<div class="mention">';
    // markup +=      '<span class="mentionBadge icon-stack"><i class="icon-circle icon-stack-base"></i><i class="icon-twitter icon-light"></i></span>';
    markup +=      '<div class="media well">';
    markup +=        '<a class="pull-left" href="#">';
    markup +=          '<img class="media-object mentionImg" alt="' + mention.user + '" src="' + mention.image + '" />';
    markup +=        '</a>';
    markup +=        '<div class="media-body">' + mention.text + '</div>';
    markup +=      '</div>'
    markup +=    '</div>';

    return markup;
  };
});
