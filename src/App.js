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
      { label: "fff", type: "enum('fg4','gy','fdr')" },
     
      { label: "nom", type: "varChar" },
      { label: "montant", type: "decimale(12,1)" },
      { label: "date", type: "date(day)" },
      { label: "time", type: "Time(s)" },
      { label: "Set", type: "set('set1','set2','set3','set4')" },
      { label: "enum", type: "enum('enum1','enum2','enum3')" }
    ],
    filterData: {
      enum: "",
      set: [],
      montant: {
        min: 0,
        max: 0
      },
      nom: "",
      paragraph: "",

      date: {
        from: null,
        to: null
      },
      time: {
        from: null,
        to: null
      }
    }
  };
  getData = val => {
    const filterData = { ...val };
    this.setState({ filterData });
    console.log(val);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <FilterAvecButton rules={this.state.rules} sendData={val => this.getData(val)} />

        <h2>App component :</h2>

        <h3>
          nom :{" "}
          <mark>
            {this.state.filterData.nom ? this.state.filterData.nom : null}
          </mark>
        </h3>
        <h3>
          montant max :{" "}
          <mark>
            {this.state.filterData.montant.max
              ? this.state.filterData.montant.max
              : null}
          </mark>
        </h3>
        <h3>
          montant min :{" "}
          <mark>
            {this.state.filterData.montant.min
              ? this.state.filterData.montant.min
              : null}
          </mark>
        </h3>
        <h3>
          date from :{" "}
          <mark>
            {this.state.filterData.date.from
              ? this.state.filterData.date.from
              : null}
          </mark>
        </h3>
        <h3>
          date to :{" "}
          <mark>
            {this.state.filterData.date.to
              ? this.state.filterData.date.to
              : null}
          </mark>
        </h3>
        <h3>
          enum :{" "}
          <mark>
            {this.state.filterData.enum ? this.state.filterData.enum : null}
          </mark>
        </h3>

        <h3>
          set :{" "}
          <mark>
            {this.state.filterData.set ? this.state.filterData.set : null}
          </mark>
        </h3>

        <h3>
          time from :{" "}
          <mark>
            {this.state.filterData.time.from
              ? this.state.filterData.time.from
              : null}
          </mark>
        </h3>
        <h3>
          time to :{" "}
          <mark>
            {this.state.filterData.time.to
              ? this.state.filterData.time.to
              : null}
          </mark>
        </h3>
      </div>
    );
  }
}

export default withStyles(styles)(App);
