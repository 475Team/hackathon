var offset = 5;
var intervals = [];
var newVideo = true;
var minLength = 10;
var currentKey;
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
          list: 'PLDB2873BD72B1530A'
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
    if (intervals.length > 0) {
      if(videoTime != oldTime && clicked == false && videoTime >= intervals[0]) {
        getTime(clicked, videoTime, intervals[0], intervals[0] + minLength, currentKey, function(isClicked) {
          clicked = isClicked;
          console.log("getTime callback: " + clicked);
        });       
      }
    }
    console.log("updateTime: " + clicked);
  }
  timeupdater = setInterval(updateTime, 100);
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
  currentKey = generateKey();
  videoTime = 0;
}

function getTime(clicked, videoTime, startInterval, endInterval, keyCode, callback) {

  timekeeper(clicked, videoTime, startInterval, endInterval, function(isClicked){
    clicked = isClicked;
    console.log("Timekeeper callback: " + clicked);
    callback(clicked);
  }, keyCode);
  console.log("Clicked: " + clicked);
  if (clicked == true) {
    console.log("Handle clicked is true");
    clicked = false;
    intervals.shift();
    console.log(intervals);
    currentKey = generateKey();
  } else if (videoTime >= endInterval && clicked != true) {
    console.log("Handle past end of interval & clicked not true");
    player.seekTo(0);
    $("#dialog").text("");
    $(".window").hide();
    clicked = false;
    generateIntervals(0, true);
  }
  console.log("Clicked: " + clicked + " Next start: " + intervals[0]);
  callback(clicked);
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

function generateKey(){
  return 65 + Math.floor(Math.random()*25);
}

function stopVideo() {
  player.stopVideo();
}