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

##### FilterAvecButton
You give this component array of object as props  each object has label and type of the label .
the component treat the array and put a textfield for every label in the array according to the type of the label and this component return data as well.


