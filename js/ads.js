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

function onProgress(time){
 if(time > 2.8 && time < 3){
  stopVideo();
 }
 clickKeyboard();
}

window.addEventListener("keyup", keyReleased, false);

function keyReleased(e){
  console.log("keyReleased")
  stopVideo();
}

function clickKeyboard(){
  $("#command").text("Now click 'p' to continue the video")
  $(document).keydown(function(e){
    if(e.keyCode==80){
      player.playVideo();
    }
  })
}