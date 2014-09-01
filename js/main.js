function timekeeper(videoTime) { 
		var clicked = false;
    if (videoTime > 1 && videoTime < 5) {
      $("#command").text("Press P");
      if (clicked == false){
      	clicked = clickKeyboard(80);
      	console.log("inside the p: " + clicked)
      }
    } else if (videoTime >= 5){
    	console.log(clicked)
    	if (clicked == false){
    		player.stopVideo(); //change this
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



