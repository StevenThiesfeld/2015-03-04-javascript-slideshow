var randomDisplay = 0;

var imageDir = "images/";

var imageNum = 0;

var currentImage = 0;

var imageArray = [];

var totalImages;

function addImage(imageName){
  imageArray[imageNum++] = imageDir + imageName;
  totalImages = imageArray.length
}

function nextImage(){
  currentImage = (currentImage+1) % totalImages;
  document.getElementById("slide-image").src = imageArray[currentImage] 
}

function previousImage(){
  currentImage = (currentImage-1) % totalImages;
  document.getElementById("slide-image").src = imageArray[currentImage] 
}

addImage("image-0.jpg");
addImage("image-1.jpg");
addImage("image-2.jpg");