// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  console.log("onYouTubeIframeAPIReady");
  player = new YT.Player('player', 
  {
      height: '700',
      width: '100%',
      videoId: 'FCwQ2qTUqKQ',
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
  console.log("hi");
  //refactor this
  var videoTime = 0;
  var timeupdater = null;
  function updateTime() {
    var oldTime = videoTime;
    if(player && player.getCurrentTime) {
      videoTime = player.getCurrentTime();
    }
    if(videoTime !== oldTime) {
      timekeeper(videoTime);
    }
  }
  timeupdater = setInterval(updateTime, 100);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  console.log("Player state change");
  if (event.data == YT.PlayerState.PLAYING && !done) {
    var currentTime = player.getCurrentTime();
    //setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}