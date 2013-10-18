var youtubeSearch = require('youtube-search');

var youtubeBestVideo = {};

var _goodDescriptionWords = ['official', 'download', 'itunes', 'pre-order', 'performing'];
var _badDescriptionWords = ['cover', 'live'];

var _getRating = function(video) {
  var rating = 0;
  
  if(!video.description) return rating;

  for(var i = 0; i < _goodDescriptionWords.length; i++) {
    if(video.description.toLowerCase().indexOf(_goodDescriptionWords[i]) > -1) {
      rating++;
    }
  }

  for(var i = 0; i < _badDescriptionWords.length; i++) {
    if(video.description.toLowerCase().indexOf(_badDescriptionWords[i]) > -1) {
      rating--;
    }
  }

  return rating;
}

youtubeBestVideo.findBestVideo = function(title, cb) {
  youtubeSearch.search(title, {}, function(err, results) {
    if(err) cb(err);

    var bestOne = null;
    var bestRating = 1;

    results.forEach(function(result, index) {
      if(_getRating(result) > bestRating) {
        bestOne = result;
      }

      if(index === results.length - 1) {
        cb(null, bestOne);
      }
    });
  });
};

module.exports = youtubeBestVideo;
