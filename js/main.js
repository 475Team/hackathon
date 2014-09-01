function timekeeper(videoTime) { 
		var clicked = false;
    if (videoTime > 1 && videoTime < 5) {
      $("#command").text("Press P");
      if (clicked == false){
      	clicked = clickKeyboard(80);
      }
    } else if (videoTime >= 5){
    	if (clicked == false){
    		player.seekTo(0); //change this
    	}
    	clicked = false;
    }
}

function clickKeyboard(keyCode){
  $(document).keydown(function(e){
    if(e.keyCode==keyCode){
    	$("#command").text("");
      return true;
    }
  })
}



