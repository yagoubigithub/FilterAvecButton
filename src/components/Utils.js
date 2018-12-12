export function TraitementType(type) {
  if (/decimale|Decimale/.test(type)) {
    const NumberZero =
        Number.parseInt(type.slice(type.indexOf(",") + 1, type.length - 1)) - 1;
      const step = "0." + "0".repeat(NumberZero) + "1";
    //traitemen decimale
    if (!/minmax|MINMAX|MinMax/.test(type)) {
      
      return { type: "number", step: step, defaultValue: 0 };
    } else {
      return {
        type: "number",
        step: step,
        defaultValue: 0,
        returnType: "minmax"
      };
    }
  } else if (/int|Int|INT|entier|Integer/.test(type)) {
    //traitemen entier
    if (!/minmax|MINMAX|MinMax/.test(type)) {
      return { type: "number", step: 1, defaultValue: 0 };
    } else {
      return { type: "number", step: 1, defaultValue: 0, returnType: "minmax" };
    }
  } else if (/varChar|varchar|var-char|var_char/.test(type)) {
    //traitemen varchar
    return { type: "string", step: null };
  } else if (/date|Date/.test(type)) {


    
    const currentDate = new Date()
      .toLocaleDateString()
      .replace(/\//gi, "-")
      .split("-")
      .reverse()
      .join("-");

 if (!/minmax|MINMAX|MinMax/.test(type)) {
  return { type: "date", defaultValue: currentDate };
 }else{
  return { type: "date", defaultValue: currentDate,returnType  : "minmax" };
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
        defaultValue: currentTime.slice(0, currentTime.length - 3)
        
      };
      break;
    case "m":
      return {
        type: "time",
        step: 120,
        defaultValue: currentTime.slice(0, currentTime.length - 3)
       
      };
      break;
    case "h":
      return {
        type: "time",
        step: 3600,
        defaultValue: currentTime.slice(0, currentTime.length - 3)
       
      };
      break;
  }
 }else{
  switch (stepType) {
    case "s":
      return {
        type: "time",
        step: 1,
        defaultValue: currentTime.slice(0, currentTime.length - 3)
        ,returnType  : "minmax"
      };
      break;
    case "m":
      return {
        type: "time",
        step: 120,
        defaultValue: currentTime.slice(0, currentTime.length - 3)
        ,returnType  : "minmax"
      };
      break;
    case "h":
      return {
        type: "time",
        step: 3600,
        defaultValue: currentTime.slice(0, currentTime.length - 3)
        ,returnType  : "minmax"
      };
      break;
  }
 }
   
  } else if (/Set|set|SET/.test(type)) {
    const arraySet = type
      .slice(type.indexOf("(") + 1, type.indexOf(")"))
      .replace(/'/g, "")
      .split(",");

    return {
      type: "set",
      defaultValue: arraySet
    };
  } else if (/Enum|ENUM|enum/.test(type)) {
    const arraySet = type
      .slice(type.indexOf("(") + 1, type.indexOf(")"))
      .replace(/'/g, "")
      .split(",");

    return {
      type: "enum",
      defaultValue: arraySet
    };
  } else if (/Select|select|SELECT/.test(type)) {
    const arraySet = type
      .slice(type.indexOf("(") + 1, type.indexOf(")"))
      .replace(/'/g, "")
      .split(",")
      .map(value => {
        return { value: value, label: value };
      });
      if(!/multiple|mult|MULTIPLE|Multiple/.test(type)){
        return {
          type: "Select",
          defaultValue: arraySet
        };
      }else{
        return {
          type: "Select",
          defaultValue: arraySet,
          returnType : "multiple"
        };
      }

    
  } else {
    return {
      type: "",
      defaultValue: ""
    };
  }
}
