
const initPassPort = () => {
/* GET NECESSARY VARIABLES */
const cropImage = document.getElementById('crop-image');
const fileInput = document.querySelector("#fileInput");
const loaderCard = document.querySelector("#loader-card"),
displayPhotoCard = document.querySelector("#display-photo-card"),
addPhotoCard = document.querySelector("#add-photo-card"),
cropPhotoCard = document.querySelector("#crop-photo-card"),
// downloadPhotoCard = document.querySelector("#download-photo-card"),
uploadPhotoCard = document.querySelector("#upload-details-card"),
successfullUploadCard = document.querySelector("#successfull-upload-card");

console.log(loaderCard)


const activeScreen = (screen) => {
loaderCard.style.display = "none";
displayPhotoCard.style.display = "none";
addPhotoCard.style.display = "none";
cropPhotoCard.style.display = "none";
// downloadPhotoCard.style.display = "none";
uploadPhotoCard.style.display = "none";
successfullUploadCard.style.display = "none";
//turn on an active screen
screen.style.display = 'flex';
}

activeScreen(addPhotoCard);

/*DEFAULT CONSRTUCTORS FUNCTIONS*/
const formData = new FormData(),
       reader = new FileReader();
let file = null;

fileInput.addEventListener("input",function(e){
// check if a file was selected
if(this.files && this.files[0]){
// check if the selected file as an image file
if(this.files[0].type.match(/^image\//)){
 file =  this.files[0]
 reader.readAsDataURL(file)
 reader.onloadend = function(){
 console.log(reader.result)  
 cropImage.src = reader.result; 
 
 activeScreen(cropPhotoCard)

// use cropper api
const cropper = new Cropper(cropImage,{
aspectRatio: 1
});
console.log(cropper)

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












}

initPassPort();