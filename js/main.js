function timekeeper(videoTime, startInterval, endInterval, callback, keyCode) { 
    if (videoTime > startInterval && videoTime < endInterval) {
      $("#dialog").text("Press " + String.fromCharCode(keyCode));
      $('.window').show();
      showPopUp();
      clickKeyboard(keyCode, function(isClicked){
        callback(true);
        
      })
    }
    callback(false);
}

function clickKeyboard(keyCode, callback){
  $(document).keydown(function(e){
    console.log(e.keyCode + " : " + keyCode);
    if(e.keyCode==keyCode){
      $("#dialog").text("");
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
