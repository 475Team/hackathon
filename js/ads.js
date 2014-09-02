var offset = 5;
var intervals = [];
var newVideo = true;
var minLength = 10;
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
  var nextStartTime;

  function updateTime() {
    var oldTime = videoTime;
    if(player && player.getCurrentTime) {
      videoTime = player.getCurrentTime();
    }
    console.log(videoTime);
    if (intervals.length > 0){
      getStartTime(function(nextStartTime){
        if(videoTime != oldTime && clicked == false && videoTime >= nextStartTime) {
          generateKey(function(keyCode){
            getTime(clicked, videoTime, nextStartTime, nextStartTime + minLength, keyCode, function(isClicked) {
              clicked = isClicked;
              if(clicked == true){
                nextStartTime = intervals.shift();
                console.log("nextStartTime: " + nextStartTime);
              }
            });          
          })
        }
        if(nextStartTime > videoTime){
          clicked = false;
        }
      })
    }
  }
  timeupdater = setInterval(updateTime, 100);
}

function getStartTime(callback){
  callback(intervals.shift());
}
function generateIntervals(startTime, startFlag) {
  if (startFlag == true){
    intervals = [];
  }
  var duration = player.getDuration();
  console.log(duration);
  var maxDiff = 10;
  startTime = startTime + minLength + Math.random() * maxDiff;
  console.log(startTime);
  if (startTime < duration - offset) {
    intervals.push(startTime);
    generateIntervals(startTime);
  }
  console.log(intervals);
  newVideo = false;
}

function getTime(clicked, videoTime, startInterval, endInterval, keyCode, callback) {

  timekeeper(clicked, videoTime, startInterval, endInterval, function(isClicked){
    clicked = isClicked;
    callback(clicked);
  }, keyCode);
  if (videoTime >= endInterval) {
    $("#command").text("");
    // refactor code below
    if (clicked != true){
      player.seekTo(0);
      $(".window").hide();
      clicked = false;
    } else {
      clicked = false;
      $(".window").hide();
    }
    callback(clicked);
  }
  
  console.log(clicked);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var numAds = 0;
function onPlayerStateChange(event) {
  console.log(event.data + ", " + newVideo);
  if (event.data == YT.PlayerState.PLAYING) {
    var currentTime = player.getCurrentTime();
  } else if (event.data == YT.PlayerState.ENDED) {
      numAds++;
      $("#num").text(numAds / 2);
      newVideo = true;
  } else if (event.data == YT.PlayerState.UNSTARTED) {
    console.log("next vid");
    generateIntervals(0, true);
  }
}

function generateKey(callback){
  callback(65 + Math.floor(Math.random()*25));
}

function stopVideo() {
  player.stopVideo();
}