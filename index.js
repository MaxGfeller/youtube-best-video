var youtubeSearch = require('youtube-search');

var youtubeBestVideo = {};

var _goodDescriptionWords = ['official', 'download', 'itunes', 'pre-order', 'performing'];
var _badDescriptionWords = ['cover', 'live'];

/**
 * Filter a video based on the video title
 * @param  object video The video object as it is being return by youtube-search
 * @param  string title The actual title after which has been searched
 * @return float        The score between 0 and 1
 */
var _videoTitleFilter = function(video, title) {
  var rating = 0;
  var titleParts = title.split(' ');
  var disassembledTitle = title.toLowerCase();

  // Check if every word in the title exists in the video title
  for(var i = 0; i < titleParts.length; i++) {
    var titlePart = titleParts[i];
    if(titlePart.length < 2) continue;

    if(video.title.toLowerCase().indexOf(titlePart.toLowerCase()) > -1) {
      rating += 1 / titleParts.length;
      disassembledTitle.replace(titlePart.toLowerCase(), '');
    }
  }

  // Check if the video title contains any more words
  var disassembledParts = disassembledTitle.trim().split(' ');
  for(var i = 0; i < disassembledParts.length; i++) {
    var disassembledPart = disassembledParts[i];
    if(disassembledPart.length > 2) {
      rating -= 2 * (1 / titleParts.length);
    }
  }

  return rating;
}

var _viewCountFilter = function(video, title) {

}

var _favoritesCountFilter = function(video, title) {

}

var _blacklistWordsFilter = function(video, title) {

}

var _whitelistWordsFilter = function(video, title) {

}

var _authorWhitelistWordsFilter = function(video, title) {

}

var _getRating = function(video, title) {
  var rating = 0;
  
  console.log(video);
  process.exit(0);


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
