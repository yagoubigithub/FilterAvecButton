import React, { Component } from "react";

import "./App.css";

import { withStyles } from "@material-ui/core/styles/";

import Filter from "./components/Filter";
import FilterAvecButton from "./components/FilterAvecButton";

//enum ,set
const styles = theme => ({
  container: {
    background: "#fff"
  }
});

class App extends Component {
  state = {
    rules: [
      { label: "Slect___Multiple", type: "Select-Multiple('A','B','C','D')" },
      { label: "SlectMultiple__number", type: "Select-Multiple(114,92,43,41,15,8,14,35,6,788,47)" },
      { label: "nom", type: "varChar" },
      { label: "montant", type: "decimale(12,1)" },
      { label: "date", type: "date(day)" },
      { label: "time", type: "Time(s)" },
      { label: "Set", type: "set('set1','set2','set3','set4')" },
      { label: "enum", type: "enum('enum1','enum2','enum3')" },
      { label: "nom", type: "varChar" }
    ],
    
  };
  getData = val => {
    
    console.log(val);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <FilterAvecButton rules={this.state.rules} sendData={val => this.getData(val)} />

       
      </div>
    );
  }
}

export default withStyles(styles)(App);
