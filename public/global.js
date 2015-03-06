var currentPosition = 0;
var slide

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
  var form = document.createElement("FORM");
  var title = document.createElement("INPUT");
  title.setAttribute("type", "text");
  var body = document.createElement("TEXTAREA");
  var button = document.createElement("BUTTON");
  button.innerHTML = "Submit Edit"
  title.setAttribute("value", slide.title);
  body.innerHTML = slide.body;
  form.appendChild(title);
  form.appendChild(body);
  form.appendChild(button);
  document.getElementById("editContainer").appendChild(form);
  document.getElementById("showEditButton").setAttribute("class", "hide")
}

function editSlide(){ 
  
}

var displaySlide = function(event){
   slide = JSON.parse(event.target.response);
   document.getElementById("title").innerHTML = slide.title;
   document.getElementById("body").innerHTML = slide.body; 
   currentPosition = slide.position;
}