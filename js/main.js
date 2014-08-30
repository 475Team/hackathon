function timekeeper(){
    if (player.getCurrentTime() > 1 && player.getCurrentTime() < 15) {
      $("#command").text(currentTime);
    }
}
