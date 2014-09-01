function timekeeper(clicked, videoTime, startInterval, endInterval, callback) { 
    console.log("time");
    if (videoTime > startInterval && videoTime < endInterval) {
      $("#command").text("Press P");
    	clickKeyboard(80, function(isClicked){
    		callback(true);
    	})
    }
}

function clickKeyboard(keyCode, callback){
  $(document).keydown(function(e){
    if(e.keyCode==keyCode){
    	$("#command").text("");
      callback(true);
    }
  }) 
}



