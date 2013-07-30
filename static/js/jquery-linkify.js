function linkify(string, buildHashtagUrl, includeW3, target, buildUsernameUrl) {
  string = string.replace(/((http|https|ftp)\:\/\/|\bw{3}\.)[a-z0-9\-\.]+\.[a-z]{2,3}(:[a-z0-9]*)?\/?([a-z\u00C0-\u017F0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*/gi, function(captured) {
    var uri;
    if (captured.toLowerCase().indexOf("www.") == 0) {
      if (!includeW3) {
        return captured;
      }
      uri = "http://" + captured;
    } else {
      uri = captured;
    }
    return "<a href=\"" + uri+ "\" target=\"" + target + "\">" + captured + "</a>";;
  });
  
  if (buildHashtagUrl) {
    string = string.replace(/\B#(\w+)/g, "<a href=" + buildHashtagUrl("$1") +" target=\"" + target + "\">#$1</a>");
  }

  if (buildUsernameUrl) {
    string = string.replace(/\B@(\w+)/g, "<a href=" + buildUsernameUrl("$1") +" target=\"" + target + "\">@$1</a>");	
  }
  return string;
}

(function($) {
  $.fn.linkify = function(opts) {
    return this.each(function() {
      var $this = $(this);
      var buildHashtagUrl;
      var includeW3 = true;
      var target = '_self';
      var buildUsernameUrl;
      if (opts) {
        if (typeof opts == "function") {
          buildHashtagUrl = opts;
        } else {
          if (typeof opts.hashtagUrlBuilder == "function") {
            buildHashtagUrl = opts.hashtagUrlBuilder;
          }
          if (typeof opts.usernameUrlBuilder == "function") {
          	buildUsernameUrl = opts.usernameUrlBuilder;
          }
          if (typeof opts.includeW3 == "boolean") {
            includeW3 = opts.includeW3;
          }
          if (typeof opts.target == "string") {
            target = opts.target;
          }
        }
      }
      $this.html(
          $.map(
            $this.contents(),
            function(n, i) {
                if (n.nodeType == 3) {
                    return linkify(n.data, buildHashtagUrl, includeW3, target, buildUsernameUrl);
                } else {
                    return n.outerHTML;
                }
            }
        ).join("")
      );
    });
  }
})(jQuery);
