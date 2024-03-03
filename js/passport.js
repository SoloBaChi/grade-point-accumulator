
const initPassPort = () => {
/* GET NECESSARY VARIABLES */
const cropImage = document.getElementById('crop-image');
const fileInput = document.querySelector("#fileInput");
const loaderCard = document.querySelector("#loader-card"),
displayPhotoCard = document.querySelector("#display-photo-card"),
addPhotoCard = document.querySelector("#add-photo-card"),
cropPhotoCard = document.querySelector("#crop-photo-card"),
displayRemovedPhotoCard = document.querySelector("#display-removed-photo-card"),
// downloadPhotoCard = document.querySelector("#download-photo-card"),
uploadPhotoCard = document.querySelector("#upload-details-card"),
successfullUploadCard = document.querySelector("#successfull-upload-card"),
removeBackgroundBtn =  document.getElementById("remove-bg-btn"),
removedBgImageOutput = document.querySelector(".remove-bg-output"),
uploadAnotherBtn =  document.querySelector(".uploadAnother"),
downloadHref = document.querySelector(".downloadHref"),
submitBtn = document.querySelector(".submit-btn"),
whiteBgBtn = document.querySelector(".white-bg"),
redBgBtn =  document.querySelector(".red-bg"),
changeImageColorContainer = document.querySelector(".display-removed-photo-card .img-container")

// console.log(loaderCard)
console.log(removedBgImageOutput)
console.log(changeImageColorContainer)





const activeScreen = (screen) => {
loaderCard.style.display = "none";
displayPhotoCard.style.display = "none";
addPhotoCard.style.display = "none";
cropPhotoCard.style.display = "none";
// downloadPhotoCard.style.display = "none";
uploadPhotoCard.style.display = "none";
displayRemovedPhotoCard.style.display = "none";
successfullUploadCard.style.display = "none";
//turn on an active screen
screen.style.display = 'flex';
}

activeScreen(addPhotoCard);

/*DEFAULT CONSRTUCTORS FUNCTIONS*/
const formData = new FormData(),
       reader = new FileReader();
let file = null;

// from removebg
const API_URL = `https://api.remove.bg/v1.0/removebg`;
const API_KEY = `Ac63MteVmQrJbpciCUSQiVVz`


fileInput.addEventListener("input",function(e){
// check if a file was selected
if(this.files && this.files[0]){
// check if the selected file as an image file
if(this.files[0].type.match(/^image\//)){
 file =  this.files[0]
 reader.readAsDataURL(file)
 reader.onloadend = function(){
//  console.log(reader.result)  
 cropImage.src = reader.result; 
 
 activeScreen(cropPhotoCard)

// use cropper api
const cropper = new Cropper(cropImage,{
aspectRatio: 1
});
// console.log(cropper)

document.querySelector("#crop-btn").addEventListener("click",function(){
const croppedImage =  cropper.getCroppedCanvas().toDataURL("image/png");
document.getElementById("output").src = croppedImage;
activeScreen(displayPhotoCard)
})
 }
}
else{
alert("Invalid file type! Please select an image file")
}
}
else{
alert('No file(s) selected')
}

})

// for the remove background feature
removeBackgroundBtn.addEventListener("click",async function(e){
// console.log("yes")
formData.append("image_file",file)
activeScreen(loaderCard)

// send a post request to remove background.com
const res = await fetch(API_URL,{
 method:"POST",
 headers:{
 "X-Api-Key":API_KEY,    
 },
 body:formData
})

// get the removed  background image
const resObj = await res.blob();
// use file reader to read the blob file
reader.readAsDataURL(resObj)
reader.onloadend = function(){
removedBgImageOutput.src =  reader.result;
// downloadHref.setAttribute("href",reader.result)
}
activeScreen(displayRemovedPhotoCard);

})


  // DOWNLOAD THE RED BACKGROUND
  function downloadRedBackgroundImage() {
  // Get the original image
  const originalImage = document.querySelector(".display-removed-photo-card .img-container img");

  // Create a new canvas element
  const canvas = document.createElement('canvas');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;

  // Draw the red background
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `${changeImageColorContainer.classList.contains("red-color") ? "red" : "white"}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the original image on top
  ctx.drawImage(originalImage, 0, 0);

  // Create a data URL for the canvas content
  const dataURL = canvas.toDataURL('image/png');

  // get an anchor element to download the image
 downloadHref.setAttribute("href",dataURL)
 downloadHref.textContent = "Submit";
 downloadHref.style.color = '#fff';
  
setTimeout(()=>{
if(downloadHref.hasAttribute("href")){
downloadHref.removeAttribute("download")
}
},5000);

if(!downloadHref.hasAttribute("download")){
downloadHref.setAttribute("href","../submit.html")
}
}

submitBtn.addEventListener("click",downloadRedBackgroundImage);






// add red background color
  redBgBtn.addEventListener("click",(e)=>{
  changeImageColorContainer.classList.remove("white-color")
  changeImageColorContainer.classList.toggle("red-color")
  console.log("yes")
  })

// ADD whit background color
  whiteBgBtn.addEventListener("click",(e)=>{
  changeImageColorContainer.classList.remove("red-color")
  changeImageColorContainer.classList.toggle("white-color")
  })


// Reset the window incase of wrong upload
uploadAnotherBtn.addEventListener("click",()=>{
 console.log(window.location)
 window.location.reload();
})








}

initPassPort();