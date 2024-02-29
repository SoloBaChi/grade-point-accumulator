

console.log(fileInput)




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
 image.src = reader.result; 

const cropper = new Cropper(image,{
aspectRatio: 1
});
console.log(cropper)

document.querySelector("#crop-btn").addEventListener("click",function(){
const croppedImage =  cropper.getCroppedCanvas().toDataURL("image/png");
document.getElementById("output").src = croppedImage;
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





