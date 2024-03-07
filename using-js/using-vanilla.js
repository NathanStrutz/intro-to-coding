let yesBtn = document.getElementById("yesButton");
yesBtn.addEventListener("click", function () {
  document.getElementById("answerYes").style.display = "block";
  document.getElementById("answerNo").style.display = "none";
});

let noBtn = document.getElementById("noButton");
noBtn.addEventListener("click", function () {
  document.getElementById("answerYes").style.display = "none";
  document.getElementById("answerNo").style.display = "block";
});
