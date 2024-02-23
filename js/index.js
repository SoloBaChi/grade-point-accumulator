//the GP claculator calculates for 4.0 scale and 5.0 scale system
//utils
function isCorrectGpScale(scale){
    if(scale < 4 || scale > 5){
     return false;
    }
    return scale; 
    }
    
    
    let studentRecords = [["A",2],["D",3]]
    function calculateCPGA(records,scale){
    let score = 0,
        unitLoad = 0 ,
        totalSCore = 0, 
        totalUnitLoad = 0 ,
        CPG;
    
    // if(!isCorrectGpScale(scale)){
    // console.log(`invalid CPGA scale!!!`)
    //  // return;
    // }

    if(scale == 4){
     for(let [key,val] of records.entries()){
     // switch through each grade
      switch(grade){
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
          return `please enter a valid grade`
      }
    
     }
     totalSCore = score;
     totalUnitLoad = unitLoad;
    //  console.log(score)
    //  console.log(totalUnitLoad)
     CPG = (totalSCore / totalUnitLoad)
    }

    // for 5.0 GP scale
     if(scale == 5){
     console.log("GP 5.0")
     for(let [key,val] of records.entries()){
     console.log(val)
     // console.log(score)
     // switch through each grade
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
          return `please enter a valid grade`
      }
    
     }
     totalSCore = score;
     totalUnitLoad = unitLoad;
    //  console.log(score)
    //  console.log(totalUnitLoad)
     CPG = (totalSCore / totalUnitLoad)
     console.log(CPG.toFixed(2))
    }
    }
    
    calculateCPGA(studentRecords,5)


    // code to add tale row
    const addRow  = document.querySelector(".add-row"),
          deleteRow = document.querySelector(".delete-row"),
          table = document.querySelector("table#template-table");
    console.log(addRow)
    console.log(table)

    const handleAddRow = () => {
    // some ttable parameters
    const tableIndex = -1;
    let tableRow = table.insertRow(tableIndex);
    let snCounter = 1;
    
    // create an array of empty fields
    let tableData = Array(6).fill("");

    // loop through the table data field
    for(let i = 0 ; i < tableData.length; i++){
     let tableRowCell = tableRow.insertCell(i);
    
     tableRowCell.innerHTML = tableData[i]
    }

    // get the first element child
    // console.log(tableRow.firstElementChild)
    tableRow.childNodes[0].innerHTML = snCounter;
    if(table.querySelectorAll("tr").length > 2){
      tableRow.firstElementChild.innerText = 
      Number(tableRow.previousElementSibling.childNodes[0].innerHTML) + 1;
      ;
    }

    
    // check if the input key is mixture of letter and numbers
     function isWord(words){
      return /[A-Za-z0-9]/.test(words);
     }

     function addText(words){
      let str = "";
     // code to edit the added table row
     const tableRowDatas = document.querySelectorAll("table#template-table tr td")
     console.log(tableRowDatas)
     for(let i=0; i < tableRowDatas.length; i++){
      // console.log(tableRowDatas[0])
      tableRowDatas[i].addEventListener("click",(e)=>{
       e.target.innerText += words;
      console.log("Yes")
      handleAddText();
      })
     }
     }
     function handleAddText(){
     document.addEventListener("keydown",function handleKeyPress(e){
      const newCharacters = e.key;
      console.log(newCharacters)
      if(isWord(newCharacters)){
        addText(newCharacters)
      }
      else{
      return;
      }
     })
    }

     addText();
    
     
    
    }
    
    // add a row
    addRow.addEventListener("click",handleAddRow);

       // code to delete table row
    const handleDeleteRow = () => {
      let table = document.querySelector("table#template-table");

      if(table.querySelectorAll("tr").length > 1){
       table.deleteRow(-1);
      }
    }

    deleteRow.addEventListener("click",handleDeleteRow)


   

  



 