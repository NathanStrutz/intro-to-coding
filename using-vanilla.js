let yesBtn = document.getElementById("yesButton");
yesBtn.addEventListener("click", function () {
  document.getElementById("yesAnswer").style.display = "block";
  document.getElementById("noAnswer").style.display = "none";
});

let noBtn = document.getElementById("noButton");
noBtn.addEventListener("click", function () {
  document.getElementById("yesAnswer").style.display = "none";
  document.getElementById("noAnswer").style.display = "block";
});
