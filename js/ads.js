// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  console.log("onYouTubeIframeAPIReady");
  player = new YT.Player('player', 
  {
      height: '700',
      width: '100%',
      playerVars: {
          controls: '0',
          disablekb: '1',
          listType: 'playlist',
          list: 'PLo95Y9IxXB5VQ07LAjjUq8cHBlUcgVHa0'
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log("Player ready");
  event.target.playVideo();
  //refactor this
  var videoTime = 0;
  var timeupdater = null;
  var clicked = false;
  function updateTime() {
    var oldTime = videoTime;
    if(player && player.getCurrentTime) {
      videoTime = player.getCurrentTime();
    }
    if(videoTime != oldTime && clicked == false) {
      console.log(videoTime);
      timekeeper(clicked, videoTime, 5, 10, function(isClicked){
        clicked = isClicked;
      });
      if (videoTime >= 10 && clicked == false){
        player.seekTo(0);
      }
      console.log(clicked);
    }
  }
  timeupdater = setInterval(updateTime, 100);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var numAds = 0;
function onPlayerStateChange(event) {
  console.log("Player state change");
  if (event.data == YT.PlayerState.PLAYING) {
    var currentTime = player.getCurrentTime();
    //setTimeout(stopVideo, 6000);
  } else if (event.data == YT.PlayerState.ENDED) {
      numAds++;
      $("#num").text(numAds / 2);
  }
}
function stopVideo() {
  player.stopVideo();
}