import React, { Component } from "react";

import "./App.css";

import { withStyles } from "@material-ui/core/styles/";

import Filter from "./components/Filter";
import FilterAvecButton from "./components/FilterAvecButton";

//enum ,set
const styles = theme => ({
  container: {
    background: "#fff",
   
  }
});
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
  { label: "technicien", type: "set('Mohamed','Ali','Omar','Rafik','Nadire')" },
  { label: "enum", type: "enum('1','4','enum3')" },
  { label: "prenom", type: "varChar" },
  { label: "nombre de personne", type: "int-minmax" },
  { label: "nombre de departement", type: "int" },
];
class App extends Component {
  state = {
   
  //enum => select unique
  //set ==> multip select
  //checkbox => =
    
  };
  getData = val => {
    
    console.log(val);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <FilterAvecButton rules={rules} sendData={val => this.getData(val)} />

       
      </div>
    );
  }
}

export default withStyles(styles)(App);
