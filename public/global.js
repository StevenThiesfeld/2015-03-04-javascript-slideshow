var currentPosition = 0;
window.onload = function(){
  document.getElementById("editForm").addEventListener("submit", editSlide);
  document.getElementById("showEditButton").addEventListener("click", showForm);
  document.getElementById("backButton").addEventListener("click", previousSlide);
  document.getElementById("forwardButton").addEventListener("click", nextSlide);
  nextSlide()
}
  
function nextSlide(){
  var formData = new FormData();
  formData.append("currentPosition", currentPosition);
  var request = new XMLHttpRequest;
  request.open("post", "http://127.0.0.1:4567/next-slide");
  request.send(formData);
  request.addEventListener("load", displaySlide, false);
}


function previousSlide(){
  var formData = new FormData();
  formData.append("currentPosition", currentPosition);
  var request = new XMLHttpRequest;
  request.open("post", "http://127.0.0.1:4567/previous-slide");
  request.send(formData);
  request.addEventListener("load", displaySlide, false);
}

function showForm(){
  document.getElementById("editForm").setAttribute("class", "show");
  document.getElementById("showEditButton").setAttribute("class", "hide");
  document.getElementById("slideshow").setAttribute("class", "hide");
}

function editSlide(){ 
  var formElement = document.getElementById("editForm");
  var request = new XMLHttpRequest;
  request.open("post", "http://127.0.0.1:4567/edit-slide");
  request.send(new FormData(formElement));
  formElement.reset()
  request.addEventListener("load", displaySlide, false); 
}

var displaySlide = function(event){
   var slide = JSON.parse(event.target.response);
   document.getElementById("title").innerHTML = slide.title;
   document.getElementById("body").innerHTML = slide.body; 
   currentPosition = slide.position;
   document.getElementsByTagName("INPUT")[1].setAttribute("value", slide.title);
   document.getElementsByTagName("TEXTAREA")[0].innerHTML = slide.body;
   document.getElementById("slideId").setAttribute("value", slide.id)
   document.getElementById("editForm").setAttribute("class", "hide");
   document.getElementById("showEditButton").setAttribute("class", "show");
   document.getElementById("slideshow").setAttribute("class", "show");
}
