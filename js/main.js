function timekeeper(clicked, videoTime, startInterval, endInterval, callback, keyCode) { 
    console.log("time");
    if (videoTime > startInterval && videoTime < endInterval) {
      $("#command").text("Press " + String.fromCharCode(keyCode));
    	clickKeyboard(keyCode, function(isClicked){
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

