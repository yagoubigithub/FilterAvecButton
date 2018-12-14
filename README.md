# FilterAvecButton component :
```sh
const rules =[
  { label: "Slect___Multiple", type: "Select-Multiple('1','2','3','D')" },
  { label: "SlectMultiple__number", type: "Select(114,92,43,41,15,8,14,35,6,788,47)" },
  { label: "nom", type: "varChar" },
  { label: "montant", type: "decimale(12,3)" },
  { label: "argent", type: "decimale-minmax(12,3)" },
  { label: "date_range", type: "date-minmax(day)" },
  { label: "date de naissance", type: "date(day)" },
  { label: "time", type: "Time(s)" },
  { label: "deplacement", type: "Time-minmax(s)" },
  { label: "Set", type: "set('set1','set2','set3','set4')" },
  { label: "enum", type: "enum('1','4','enum3')" },
  { label: "prenom", type: "varChar" },
  { label: "nombre de personne", type: "int-minmax" },
  { label: "nombre de departement", type: "int" },
];
```

### FilterAvecButton

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


