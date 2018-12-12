export function TraitementType (type){
    if (/decimale|Decimale/.test(type)) {
      //traitemen decimale
      const NumberZero =
        Number.parseInt(type.slice(type.indexOf(",") + 1, type.length - 1)) - 1;
      const step = "0." + "0".repeat(NumberZero) + "1";
      return { type: "number", step: step, defaultValue: 0 };
    }else if (/int|Int|INT|entier|Integer/.test(type)) {
        //traitemen entier
        return { type: "number", step: 1, defaultValue: 0 };
      } else if (/varChar|varchar|var-char|var_char/.test(type)) {
      //traitemen varchar
      return { type: "string", step: null };
    } else if (/date|Date/.test(type)) {
      const stepType = type.slice(type.indexOf("(") + 1, type.length - 1);
      const currentDate = new Date()
        .toLocaleDateString()
        .replace(/\//gi, "-")
        .split("-")
        .reverse()
        .join("-");

      switch (stepType) {
        case "day":
          return { type: "date", step: null, defaultValue: currentDate };
          break;
        case "month":
          return { type: "date", step: null, defaultValue: currentDate };
          break;
        case "year":
          return { type: "date", step: null, defaultValue: currentDate };
          break;
      }
    } else if (/time|Time/.test(type)) {
      const stepType = type.slice(type.indexOf("(") + 1, type.length - 1);
      const d = new Date().toTimeString();

      const currentTime = d.slice(0, 8);

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
    }else if(/Set|set|SET/.test(type)){
        const arraySet = type.slice(type.indexOf('(') + 1,type.indexOf(')'))
        .replace(/'/g,"")
        .split(',');
        
        return {
            type : "set",
            defaultValue : arraySet
        }

    }else if(/Enum|ENUM|enum/.test(type)){
        const arraySet = type.slice(type.indexOf('(') + 1,type.indexOf(')'))
        .replace(/'/g,"")
        .split(',');
        
        
        return {
            type : "enum",
            defaultValue : arraySet
        }

    } else if(/Select-Multiple|SelectMultiple/.test(type)){
        const arraySet = type.slice(type.indexOf('(') + 1,type.indexOf(')'))
        .replace(/'/g,"")
        .split(',').map(value=>{return {value : value,label : value}});
       
        
        
        return {
            type : "Select-Multiple",
            defaultValue : arraySet
        }

    }else {
        return {
            type : "",
            defaultValue : ""
        }
          
    }
  };
