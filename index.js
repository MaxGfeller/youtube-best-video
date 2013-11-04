var youtubeSearch = require('youtube-search');

var youtubeBestVideo = {};

var _goodDescriptionWords = ['official', 'download', 'itunes', 'pre-order', 'performing'];
var _badDescriptionWords = ['cover', 'live'];

var _getRating = function(video, title) {
  var rating = 0;
  
  if(!video.description) return rating;

  // check if the title matches
  var parts = title.split(' ');
  for(var i = 0; i < parts.length; i++) {
    if(video.title.indexOf(parts[i]) < 0 && parts[i].length > 1) {
      rating += 3;
    }
  }

  // check the length of the title
  var diff = video.title.length - title.length;
  if(diff < 0) diff *= -1;

  if(diff > 4) {
    rating -= 4;
  } else {
    rating += 4;
  }

//  for(var i = 0; i < _goodDescriptionWords.length; i++) {
//    if(video.description.toLowerCase().indexOf(_goodDescriptionWords[i]) > -1) {
//      rating++;
//    }
//  }
//
//  for(var i = 0; i < _badDescriptionWords.length; i++) {
//    if(video.description.toLowerCase().indexOf(_badDescriptionWords[i]) > -1) {
//      rating--;
//    }
//  }

  return rating;
}

youtubeBestVideo.findBestVideo = function(title, cb) {
  youtubeSearch.search(title, {}, function(err, results) {
    if(err) cb(err);

    var bestOne = null;
    var bestRating = -10;

    results.forEach(function(result, index) {
      if(_getRating(result, title) > bestRating) {
        bestOne = result;
        bestRating = _getRating(result, title);
      }

      if(index === results.length - 1) {
        cb(null, bestOne);
      }
    });
  });
};

module.exports = youtubeBestVideo;
