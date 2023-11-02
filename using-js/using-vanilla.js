let yesBtn = document.getElementById("yesButton");
yesBtn.addEventListener("click", function () {
  document.getElementById("yes").style.display = "block";
  document.getElementById("no").style.display = "none";
});

let noBtn = document.getElementById("noButton");
noBtn.addEventListener("click", function () {
  document.getElementById("yes").style.display = "none";
  document.getElementById("no").style.display = "block";
});
