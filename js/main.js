
// create a local storage memory
localStorage.setItem("cgpaResults",JSON.stringify([]))


  // code to add tale row
const addRowButton  = document.querySelector(".add-row"),
deleteRowButton = document.querySelector(".delete-row"),
table = document.querySelector("table#template-table"),
// get the tfoot and hide it
tFoot = document.querySelector("tfoot");

// hide the table footer
tFoot.hidden = true;

// console.log(tFoot)

// let insertedRows = [];

// local storgge
let storage  = [];


function init(){
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
function addRow(e){
e.preventDefault();
let copiedRowData = {...data, id:generateRandomId(),semester:"first semester",gradePoint:"5.0",sN:storage.length + 1};

// spread all the values of the copied row data
// const {id,sN,courseCode,courseTitle,unitLoad,grade,gradePoint,semester} = copiedRowData;

storage = [...storage,copiedRowData] 
// storage = [{...copiedRowData}] 
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
// destructure the items property
const {id,sN, courseCode, courseTitle, unitLoad, grade, gradePoint, semester} = item;
tr.id = id; tr.className = 'table-row';


let trData = `
 <td><div data-sn="${sN}" class="row-data" data-name="sN" data-id="${id}">${sN}</div></td>
 <td><div data-sn="${sN}" class="row-data" data-name="courseCode" data-id="${id}">${courseCode}</div></td>
 <td><div data-sn="${sN}" class="row-data" data-name="courseTitle" data-id="${id}">${courseTitle}</div></td>
 <td class="unit"><div data-sn="${sN}" class="row-data" data-name="unitLoad" data-id="${id}">${unitLoad}</div></td>
 <td class="grade"><div data-sn="${sN}" class="row-data" data-name="grade" data-id="${id}">${grade}</div></td>
 <td><div data-sn="${sN}" class="row-data" data-name="gradePoint" data-id="${id}">${gradePoint}</div></td>
 <td><div data-sn="${sN}" class="row-data" data-name="semester" data-id="${id}">${semester}</div></td>
 <td class="options">
 <span class="edit-btn">
 <a href="#" class="btn-link" row-id="${id}">edit</a>
 </span>
 <span class="save-btn">
 <a href="#" class="btn-link" row-id="${id}">save</a>
 </span>
 <span class="cancel-btn">
 <a href="#" class="btn-link" row-id="${id}">cancel</a>
 </span>
 <span class="delete-btn">
 <a href="#" class="btn-link" row-id="${id}">delete</a>
 </span>
 </td>
`
tr.innerHTML = trData;

table.querySelector("tbody").insertAdjacentElement("beforeend",tr)

// Hide the save and cancel buttons
document.getElementsByClassName("save-btn")[index].hidden = true;
document.getElementsByClassName("cancel-btn")[index].hidden = true;
})

// invoke editRow function
editRowData()

// can be changed anytime soon
printGpValue()
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
function editRowData(){

// edit the signle div when clicked
table.addEventListener("click",function(e){
if(e.target.nodeName !== 'DIV') {
  return
}
e.target.setAttribute("contenteditable",true);
e.target.classList.add("active")
e.target.focus();
})

// when focused out || save a single field data
table.addEventListener("focusout",function(e){
  e.preventDefault();
  if(e.target.nodeName !== 'DIV') {
    return
  }
  e.target.setAttribute("contenteditable",false);
  e.target.classList.remove("active");

// to save the new enter data
let tempStorage = {}
let prop = e.target.dataset.name;
let val = e.target.innerText;
tempStorage[prop] = val;

// loop through storage and edit the seleected item
for(let item of storage){
if(e.target.dataset.id == item.id){

// save single filed data
Object.assign(item,tempStorage)
}
}

})
}





//::::::::::::::edit whole  data :::::::::::::::::

// :::::::::::::::Delete whole row data::::::::::::::;


// get all records
function getAllRecords(){
let records = []
let allGrades = Array.from(document.getElementsByClassName('grade'));
let allUnits = Array.from(document.getElementsByClassName('unit'));

for(let i = 0 ; i < allGrades.length; i++){
  records.push([allGrades[i].innerText,+allUnits[i].innerText])
}

// console.log(records)
return records;
}


// Do CPGA operation
function calculateCPGA(records,scale){
  let score = 0,
      unitLoad = 0 ,
      totalSCore = 0, 
      totalUnitLoad = 0 ,
      CPG;

  /*the GP claculator calculates for 4.0 scale and 5.0 scale system*/
  function isCorrectGpScale(scale){
    if(scale == 4 || scale === 5){
     return true;
    }
    return false; 
    }
  
  if(!isCorrectGpScale(scale)){
  // console.log(`invalid CPGA scale!!!`)
  return `Invalid CPGA scale!!!`;
  }

  if(scale == 4){
   for(let [key,val] of records.entries()){
   // switch through each grade
    switch(val[0]){
        case "A":
       score += 4 * val[1];
       unitLoad += val[1];
        break;
        case "B":
      score += 3 * val[1];
      unitLoad += val[1];
      break;
        case "C":
        score += 2 * val[1];
        unitLoad += val[1];
        break;
        case "D":
        score += 1 * val[1];
        unitLoad += val[1];
        break;
        case "F":
        score += 0 * val[1];
        unitLoad += val[1];
        break;
        default:
        return `Please enter a valid Grade`
    }
  
   }
   totalSCore = score;
   totalUnitLoad = unitLoad;
   CPG = (totalSCore / totalUnitLoad);
   if(!isNaN(CPG)){
    return CPG.toFixed(2);
    }
    return 'Please enter a valid Unit'
  }

  // for 5.0 GP scale
   if(scale == 5){
  //  console.log("GP 5.0")
   for(let [key,val] of records.entries()){
  //  console.log(val)
   // console.log(score)

   /* switch through each grade*/
    switch(val[0]){
        case "A":
       score += 5 * val[1];
       unitLoad += val[1];
        break;
        case "B":
      score += 4 * val[1];
      unitLoad += val[1];
      break;
        case "C":
        score += 3 * val[1];
        unitLoad += val[1];
        break;
        case "D":
        score += 2 * val[1];
        unitLoad += val[1];
        break;
        case "E":
        score += 1 * val[1];
        unitLoad += val[1];
        break;
        case "F":
        score += 0 * val[1];
        unitLoad += val[1];
        break;
        default:
        return `Please enter a valid Grade`;
    }
  
   }
   totalSCore = score;
   totalUnitLoad = unitLoad;
  //  console.log(score)
  //  console.log(totalUnitLoad)
   CPG = (totalSCore / totalUnitLoad);
   if(!isNaN(CPG)){
   return CPG.toFixed(2);
   }
   return 'Please enter a valid Unit'
  }
  }


// Print the Grade point
function printGpValue(){
const calcGpButton = document.querySelector(".gp-calc-btn");


calcGpButton.addEventListener("click",function(e){
  console.log(storage)

// to check 
const recordedResults = JSON.parse(localStorage.getItem("cgpaResults"));
recordedResults.push(storage)
console.log(recordedResults)
// console.log(recordedResults)

const result = calculateCPGA(getAllRecords(),Math.floor(5.7));

// check for the error message details
if(result.toLowerCase().startsWith("please") || result.toLowerCase().startsWith("invalid")){

//show the table footer
tFoot.hidden = false;
tFoot.childNodes[1].children[1].classList.remove("success")
tFoot.childNodes[1].children[1].innerText = result;
tFoot.childNodes[1].children[1].classList.add("error")
}
else{
//show the table footer
tFoot.hidden = false;
tFoot.childNodes[1].children[1].innerText = result;
tFoot.childNodes[1].children[1].classList.remove("error")
tFoot.childNodes[1].children[1].classList.add("success")
}
})
}
// printGpValue()
}

init();