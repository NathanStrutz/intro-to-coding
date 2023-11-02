$("#yesButton").click(function () {
  $("#yes").slideDown();
  $("#no").slideUp();
});
$("#noButton").click(function () {
  $("#yes").fadeOut(function () {
    $("#no").fadeIn();
  });
});
