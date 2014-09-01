function timekeeper(videoTime, startInterval, endInterval) { 
    console.log("time");
    if (videoTime > startInterval && videoTime < endInterval) {
      $("#command").text("Press P");
      	return clickKeyboard(80);
    } else if (videoTime >= 10){
        player.seekTo(0);
    }
    return false;
}

function clickKeyboard(keyCode){
  $(document).keydown(function(e){
    if(e.keyCode==keyCode){
    	$("#command").text("");
      return true;
    }
  })
}



