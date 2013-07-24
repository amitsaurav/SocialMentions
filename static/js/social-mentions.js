$(function() {
  var socket = io.connect('http://localhost:3000');

  socket.on('message', function (data) {
    if(data.message) {
      console.log(data.message);
    } else {
      console.info("There is a problem:", data);
    }
  });
});
