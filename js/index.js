//the GP claculator calculates for 4.0 scale and 5.0 scale system
//utils
function isCorrectGpScale(scale){
    if(scale < 4 || scale > 5){
     return false;
    }
    return scale; 
    }
    
    
    let studentRecords = [["A",4],["C",3],["A",2],["B",3]]
    function calculateCPGA(records,scale){
    let score = 0,
        unitLoad = 0 ,
        totalSCore = 0, 
        totalUnitLoad = 0 ,
        CPG;
    
    if(!isCorrectGpScale(scale)){
    console.log(`invalid CPGA scale!!!`)
     // return;
    }

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