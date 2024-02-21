

  // code to add tale row
  const addRowButton  = document.querySelector(".add-row"),
  deleteRowButton = document.querySelector(".delete-row"),
  table = document.querySelector("table#template-table");
console.log(addRowButton)
console.log(table);

function init(){

let insertedRows = [];
let storage  = [];

let data = {
id:"",
sN:"",
courseCode:"",
courseTitle:"",
unitLoad:"",
grade:"",
gradePoint:"",
semester:""
}

// generate an id for each row
const generateRandomId = () => {
let randomId = Math.random().toString(9).substr(2,3) + Math.random().toString(36).substr(2);
return randomId;
}



// add a table row and create a new object
function addRow(){
let copiedRowData = {...data, id:generateRandomId(),semester:"first semester",gradePoint:"5.0"};

// spread all the values of the copied row data
// const {id,sN,courseCode,courseTitle,unitLoad,grade,gradePoint,semester} = copiedRowData;

storage = [...storage,copiedRowData]
let tr = document.createElement("tr");

// using imperative pattren
// for(let i = 0;i < storage.length; i++){
// tr.id = storage[i].id; tr.className = 'table-row';
// trData = `
//  <td><div class="row-data">${storage[i].sN}</div></td>
//  <td><div class="row-data">${storage[i].courseCode}</div></td>
//  <td><div class="row-data">${storage[i].courseTitle}</div></td>
//  <td><div class="row-data">${storage[i].unitLoad}</div></td>
//  <td><div class="row-data">${storage[i].grade}</div></td>
//  <td><div class="row-data">${storage[i].gradePoint}</div></td>
//  <td><div class="row-data">${storage[i].semester}</div></td>
// `
// }
// using declarative pattern
storage.forEach((item,index,arr)=>{
tr.id = item.id; tr.className = 'table-row';

let trData = `
 <td><div class="row-data">${arr.length}</div></td>
 <td><div class="row-data">${item.courseCode}</div></td>
 <td><div class="row-data">${item.courseTitle}</div></td>
 <td><div class="row-data">${item.unitLoad}</div></td>
 <td><div class="row-data">${item.grade}</div></td>
 <td><div class="row-data">${item.gradePoint}</div></td>
 <td><div class="row-data">${item.semester}</div></td>
 <td class="options">
 <span class="edit-btn">
 <a href="#" class="btn-link" row-id=${item.id}>edit</a>
 </span>
 <span class="save-btn">
 <a href="#" class="btn-link" row-id=${item.id}>save</a>
 </span>
 <span class="cancel-btn">
 <a href="#" class="btn-link" row-id=${item.id}>cancel</a>
 </span>
 <span class="delete-btn">
 <a href="#" class="btn-link" row-id=${item.id}>delete</a>
 </span>
 </td>
`
tr.innerHTML = trData;

table.querySelector("tbody").insertAdjacentElement("beforeend",tr)
// console.log(copiedRowData)

// Hide the save and cancel buttons
document.getElementsByClassName("save-btn")[index].hidden = true
document.getElementsByClassName("cancel-btn")[index].hidden = true
})

console.log(storage)

//invoke edit row
editRow()
}

// add a row when the addRow Button is clicked
addRowButton.addEventListener("click",addRow)


// Delete a Row
function deleteRow(){
storage.pop();
const tableRows =  document.getElementsByClassName("table-row");
const tableRowsArr =  Array.from(tableRows);
const tbody = table.querySelector("tbody")

if(table.hasChildNodes() && tableRowsArr.length > 0){
tbody.removeChild(tbody.children[tableRowsArr.length])
}
}

// delete a row when the deleteRow Button is clicked
deleteRowButton.addEventListener("click",deleteRow)



//:::::::::::::::::::TODOS::::::::::::::::::::
// edit single field data
function editRow(){
let rowData = Array.from(table.getElementsByClassName("row-data"));
// console.log(rowData)
for(let i = 0; i < rowData.length ; i++){
rowData[i].addEventListener("click",function(e){
// console.log("yes")
this.setAttribute("contenteditable",true);
this.classList.add("active")
this.focus();
})

// when focused out
rowData[i].addEventListener("focusout",function(e){
// console.log("out")
this.setAttribute("contenteditable",false);
this.classList.remove("active")
})
}
}





// save single filed data



//edit row data 



// Delete a row data



// rough
document.querySelector(".gp-calc-btn")
.addEventListener("click",(e)=>{
alert("coming soon!")
})
}

init();