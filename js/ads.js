var offset = 5;
var intervals = [];
var newVideo = true;

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
  $('.window').hide();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log("Player ready");
  event.target.playVideo();

  generateIntervals(0);
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
      getTime(clicked, videoTime, 1, 10, 83, function(isClicked) {
        clicked = isClicked;
        $('.window').hide();
      });
    }
  }
  timeupdater = setInterval(updateTime, 100);
}

function generateIntervals(startTime) {
  var duration = player.getDuration();
  console.log(duration);
  var minLength = 10;
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
  console.log(videoTime);
  timekeeper(clicked, videoTime, startInterval, endInterval, function(isClicked){
    clicked = isClicked;
    callback(clicked);
  }, keyCode);
  if (videoTime >= endInterval) {
    $("#command").text("");
    if (clicked != true){
      player.seekTo(0);
      clicked = false;
    } else {
      clicked = false;
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
  console.log("Player state change");
  if (event.data == YT.PlayerState.PLAYING) {
    var currentTime = player.getCurrentTime();
    //setTimeout(stopVideo, 6000);
  } else if (event.data == YT.PlayerState.ENDED) {
      numAds++;
      $("#num").text(numAds / 2);
      newVideo = true;
  } else if (event.data == YT.PlayerState.PLAYING && newVideo == true) {
    if (intervals.length == 0) {
      generateIntervals(0);
    } else {
      resetIntervals(function() {
        generateIntervals(0);
      })
    }
  }
}

function resetIntervals(intervals, callback){
  intervals = [];
  callback();
}

function stopVideo() {
  player.stopVideo();
}