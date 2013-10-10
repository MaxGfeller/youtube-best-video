# youtube-best-video

Find the best (music) video for a song you want on [YouTube](http://youtube.com)

## Install

The module is available via npm and can be installed as follows:  
`npm install youtube-best-video` 

## Usage

``` javascript
var bestVideo = require('youtube-best-video');

bestVideo.findBestVideo('Deadmau5 - Ghosts N Stuff', function(err, video) {
  if(err) return console.log(err);

  console.dir(video);
});
```
