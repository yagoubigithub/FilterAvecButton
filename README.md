# FilterAvecButton component :

>You give this component array of object as props ```<FilterAvecButton rules={rules} />```  each object has label and type of the label .
the component treat the array and put a textfield for every label in the array according to the type of the label and this component return data as well.
the data is an object  : ```filterData```  this object has 3 object ```{minmax,array,serch}```


#### exemple :
In parent compnent  :
```
const rules =[
   { label: "argent", type: "decimale-minmax(12,3)" },
   { label: "deplacement", type: "time(s)" },
   { label: "technicien", type: "set('Mohamed','Ali','Omar','Rafik','Nadire')" },
  ];
```
``` 
 getData = filterData => {
    //handel the data 
    console.log(filterData);
  };
```
 ```sh
<FilterAvecButton rules={rules} sendData={filterData=>this.getData(filterData)} />
```
#### the Data from the  FilterAvecButton  component
in the console :
```
filterData  : {
    minmax : {
        argent : { 
                 value : {min :"12.02", max : "14:14"},
                 type : "number" 
              }
         },
    array :{
        technicien :{
            value :['Mohamed','Rafik', 'Omar'],
            type :'string'
        }
    }
    serch :{
         deplacement : {
             value : "12:05",
             type : "time"
         }
    }
}
```
##### The type in the rules and the type returned from FilterAvecButton :

| rules type | filterData type |
| ------ | ------ |
| Select-Multiple | in array object  :{ Name of label :{ value : [Array of value] ,type : type of the values in the array } |
| Select  | in serch object  : {  Name of label : {value : "the value of selected value" ,type : "string"} }  |
| varChar  | in serch object  : {  Name of label : {value : "the value typed in the textfield" ,type : "string"} } |
| decimale(Number of digits after comma) | in serch object  : {  Name of label : {value : "the number typed in the textfield " ,type : "number"} } |
| decimale-minmax(Number of digits after comma) | in minmax object  : {Name of label : {value :{min : "min value", max : "max value"} ,type : "number" }}|
| date-minmax |  in minmax object  : {Name of label : {value :{from : "Start date", max : "End date"} ,type : "date" }}|
| date | in serch object  : {  Name of label : {value : "the date returned from  textfield" ,type : "date"} } |
| Time(step) step= ```s``` the step is by second OR ```m``` the step is by minute OR ```h``` the step is by houre   | in serch object  : {  Name of label : {value : "the time returned from  textfield" ,type : "time"} } |
|Time-minmax(step)| in minmax object  : {Name of label : {value :{start : "Start time", end : "End time"} ,type : "time" }}|


