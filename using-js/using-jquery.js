$("#yesButton").click(function () {
  $("#answerYes").slideDown();
  $("#answerNo").slideUp();
});
$("#noButton").click(function () {
  $("#answerYes").fadeOut(function () {
    $("#answerNo").fadeIn();
  });
});
