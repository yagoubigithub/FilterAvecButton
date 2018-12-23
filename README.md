# FilterAvecButton component :

>You give this component array of object as props ```<FilterAvecButton rules={rules} />```  each object has label and type of the label .
the component treat the array and put a textfield for every label in the array according to the type of the label and this component return data as well.
the data is an object  : ```filterData```  this object has 3 object ```{minmax,array,serch}```


#### exemple :
In parent compnent  :
```
const rules =[
   { label: "argent", type: "decimale-minmax(3)" },
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
        argent : {
                    min :"12.02",
                    max : "14:14"
              },
        technicien :{
            array : ['Mohamed','Rafik', 'Omar']
        }
      deplacement : {
             serch : "12:05"
         }
}
```
##### The type in the rules and the type returned from FilterAvecButton :

| rules type | filterData type |
| ------ | ------ |
| ```Select-Multiple```('value1','value2','value3',...) |   Name of the label :{ ```array``` : [Array of values] }  |
| ```Select```('value1','value2','value3',...)  |  Name of the label : {```serch``` : "the value of selected value" }   |
| ```varChar```  |   Name of the label : {```serch```  : "the value typed in the textfield"  } |
| ```decimale```(Number of digits after comma) |   Name of label : {```serch```  : "the number typed in the textfield " }  |
| ```decimale-minmax```(Number of digits after comma) |  Name of label : {```min``` : "min value", ```max``` : "max value"}  |
| ```date-minmax``` |  Name of label : {```from``` : "Start date", ```to``` : "End date"} |
| ```date``` |   Name of label : {```serch```  : "the date returned from textfield"}  |
| ```Time```(step) step= ```s``` the step is by second OR ```m``` the step is by minute OR ```h``` the step is by houre   |   Name of label : {```serch```  : "the time returned from  textfield" } |
|```Time-minmax```(step)|Name of label : {```start``` : "Start time", ```end``` : "End time"}   |
| ```set```('value1','value2','value3',...)  |Name of label :{ ```array```  : [Array of values] } |
|```enum```('value1','value2','value3',...)|    Name of label : {```serch```  : "the value selected from radio buttons" } |
| ```int-minmax``` |  Name of label : {```min``` : "number typed in textfield", ```max``` : "number typed in textfield"}  |
| ```int``` |    Name of label : {```serch```  : "the number typed in the textfield " } |


