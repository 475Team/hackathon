function timekeeper(clicked, videoTime, startInterval, endInterval, callback, keyCode) { 
    console.log("timekeeper: " + clicked);
    if (videoTime > startInterval && videoTime < endInterval) {
      $("#command").text("Press " + String.fromCharCode(keyCode));
      $('.window').show();
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