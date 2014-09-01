function timekeeper(clicked, videoTime, startInterval, endInterval, callback) { 
    console.log("time");
    if (videoTime > startInterval && videoTime < endInterval) {
      showPopUp();
    	clickKeyboard(80, function(isClicked){
    		callback(true);
    	})
    }
}

function clickKeyboard(keyCode, callback){
  $(document).keydown(function(e){
    if(e.keyCode==keyCode){
    	$("#command").text("");
    	$('.window').hide();
      callback(true);
    }
  })
}

function showPopUp(){
	console.log("show message")
	var id = $("#dialog");
	//Set the popup window to center
	$(id).css('top',  300);
	$(id).css('left', 500);
    $('.window').show(); 
}       
