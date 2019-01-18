export function TraitementType(type,label) {
  if (/decimale|Decimale/.test(type)) {
    const NumberZero =
        Number.parseInt(type.slice(type.indexOf("(") + 1 , type.indexOf(")") )) -1;
      const step = "0." + "0".repeat(NumberZero) + "1";
    //traitemen decimale
    if (!/minmax|MINMAX|MinMax/.test(type)) {
      
      return { type: "number", step: step, defaultValue: 0 };
    } else {
      return {
        type: "number",
        step: parseFloat(step),
        defaultValue: 0,
        returnType: "minmax",
        width : "300px"
      };
    }
  } else if (/int|Int|INT|entier|Integer/.test(type)) {
    //traitemen entier
    if (!/minmax|MINMAX|MinMax/.test(type)) {
      return { type: "number", step: 1, defaultValue: 0  ,
      width : "170px"};
    } else {
      return { type: "number", step: 1, defaultValue: 0, returnType: "minmax" ,
      width : "300px" };
    }
  } else if (/varChar|varchar|var-char|var_char/.test(type)) {
    //traitemen varchar
    const numberChar =
        Number.parseInt(type.slice(type.indexOf("(") + 1 , type.indexOf(")") ));
        if(numberChar > 26){
          console.log(Math.log10(numberChar));
          return { type: "string", step: null,multiline :true,rows : 3 ,
          width :  `${Number.parseInt(Math.log10(numberChar)) * 100}px`};
        }else{
          return { type: "string", step: null,multiline :false ,rows : null,
          width : `${numberChar * 6}px` };
        }
   
  } else if (/date|Date/.test(type)) {


    
    const currentDate = new Date()
      .toLocaleDateString()
      .replace(/\//gi, "-")
      .split("-")
      .reverse()
      .join("-");

 if (!/minmax|MINMAX|MinMax/.test(type)) {
  return { type: "date", defaultValue: currentDate ,
  width : "300px"};
 }else{
  return { type: "date", defaultValue: currentDate,returnType  : "minmax",
  width : "300px" };
 }
    
  } else if (/time|Time/.test(type)) {
    const stepType = type.slice(type.indexOf("(") + 1, type.length - 1);
    const d = new Date().toTimeString();
    const currentTime = d.slice(0, 8);

 if (!/minmax|MINMAX|MinMax/.test(type)) {

  switch (stepType) {
    case "s":
      return {
        type: "time",
        step: 1,
        defaultValue: currentTime.slice(0, currentTime.length - 3),
        width : "170px"
        
      };
      
    case "m":
      return {
        type: "time",
        step: 120,
        defaultValue: currentTime.slice(0, currentTime.length - 3),
        width : "170px"
       
      };
     
    case "h":
      return {
        type: "time",
        step: 3600,
        defaultValue: currentTime.slice(0, currentTime.length - 3),
        width : "170px"
       
      };
     
      default : 
      break;
  }
 }else{
  switch (stepType) {
    case "s":
      return {
        type: "time",
        step: 1,
        defaultValue: currentTime.slice(0, currentTime.length - 3)
        ,returnType  : "minmax",
        width : "300px"
      };
      
    case "m":
      return {
        type: "time",
        step: 120,
        defaultValue: currentTime.slice(0, currentTime.length - 3)
        ,returnType  : "minmax",
        width : "300px"
      };
     
    case "h":
      return {
        type: "time",
        step: 3600,
        defaultValue: currentTime.slice(0, currentTime.length - 3)
        ,returnType  : "minmax",
        width : "300px"
      };
     
      default : 
      break;
  }
 }
   
  } else if (/Set|set|SET/.test(type)) {
    const arraySet = type
      .slice(type.indexOf("(") + 1, type.indexOf(")"))
      .replace(/'/g, "")
      .split(",").map(value => {
        return { value: value, label: value  };
      });
      let maxSet = "";
      let len = 10;
      let lenLabel = label.length;
      arraySet.forEach(element => {
        if(element.value.length >= maxSet.length){
         maxSet = element.value;
        }
      });
      
      if(maxSet.length > 10){
        len = maxSet.length;

      }
      if(len < lenLabel){
        len = lenLabel;
      }
      if(arraySet.length < 4){
        return {
          type: "set",
          defaultValue: arraySet,
          width : `${len * 10 + 50}px`
        };
        
      }else{
      
        return {
          type: "Select",
          defaultValue: arraySet,
          returnType : "multiple",
          width : `${len * 10 + 50}px`
        };
      }

    
  } else if (/Enum|ENUM|enum/.test(type)) {
    const arrayEnum = type
      .slice(type.indexOf("(") + 1, type.indexOf(")"))
      .replace(/'/g, "")
      .split(",").map(value => {
        return { value: value, label: value };
      });
      let maxEnum = "";
      let len = 10;
      let lenLabel = label.length;
      arrayEnum.forEach(element => {
        if(element.value.length >= maxEnum.length){
         maxEnum = element.value;
        }
      });
      console.log(`${maxEnum.length * 10 + 50}px`);
      if(maxEnum.length > 10){
        len = maxEnum.length;

      }
      if(len < lenLabel){
        len = lenLabel;
      }
      if(arrayEnum.length < 4){
        return {
          type: "enum",
          defaultValue: arrayEnum,
          width : `${len * 10 + 50}px`,
        };
      }else{

       
        return {
          type: "Select",
          defaultValue: arrayEnum,
          width : `${len * 10 + 50}px`,
          returnType : "no-multiple",
        };
      }

   
  }  else {
    return {
      type: "",
      defaultValue: ""
    };
  }
}
