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

function showPopUp(){
	console.log("show message")
	var id = $("#dialog");
        //Set the popup window to center
        $(id).css('top',  125);
        $(id).css('left', 360.5);
        
}

$(document).ready(function() {    

    //if close button is clicked
   /* $('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        $('.window').hide();
    });          
    */
});

 $(document).keyup(function(e) {
		if(e.keyCode == 80) {

			$('.window').hide();
  		}
});
