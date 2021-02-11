// First, some basic javascript changing operations

let tag = window.document.getElementById("here");
tag.innerText = "HELLO";
tag.innerHTML = "<em>Hey there</em>";
tag.style.color = "green";

// version 2, click events

function setUpClick() {
  let tag = document.getElementById("showhide");
  tag.addEventListener("click", showHiddenIcon);
}
const showHiddenIcon = function () {
  if (document.getElementById("icon").style.display === "none") {
    document.getElementById("icon").style.display = "block";
  } else {
    document.getElementById("icon").style.display = "none";
  }
};

setUpClick();

// Version 3, jQuery

$("#jqButton").click(function () {
  $("#icon").slideToggle();
});

// Version 4, Vue.js
// but what happens when jQuery isn't enough?
// what if we could make a whole framework around the HTML with JavaScript?

new Vue({
  el: "#app",
  data: {
    show: false,
  },
});
