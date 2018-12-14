import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";
import { TraitementType } from "./Utils";
import DatePicker from "./Date";

import Set from "./Set";
import Enum from "./Enum";
const styles = theme =>
  console.log(theme) || {
    TextFieldContainer: {
      display: "flex",
      width: 400
    }
  };

class Filter extends Component {
  state = {
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
  getRadioData = val => {
    const { filterData } = { ...this.state };
    filterData.enum = val;
    this.setState({ filterData });

    this.props.sendData(filterData);
  };
  getCheckBoxData = val => {
    const { filterData } = { ...this.state };
    filterData.set = val;
    this.setState({ filterData });
    this.props.sendData(filterData);
  };
  handleChange = (event, label, MinOrMax) => {
    switch (label) {
      case "time":
        {
          const { filterData } = { ...this.state };
          filterData.time[MinOrMax] = event.target.value;
          this.setState({ filterData });
          this.props.sendData(filterData);
        }
        break;

      case "montant":
        {
          const { filterData } = { ...this.state };
          filterData.montant[MinOrMax] = event.target.value;
          this.setState({ filterData });
          this.props.sendData(filterData);
        }
        break;
      default:
        const { filterData } = { ...this.state };
        filterData.nom = event.target.value;
        this.setState({ filterData });
        this.props.sendData(filterData);
        break;
    }
    
  };
  getDatePickerData = val => {
    if (val.from) {
      const { filterData } = { ...this.state };
      filterData.date.from = val.from;
      this.setState({ filterData });
      this.props.sendData(filterData);
    } else {
      const { filterData } = { ...this.state };
      filterData.date.to = val.to;
      this.setState({ filterData });
      this.props.sendData(filterData);
    }
    
  };

  /* componentDidUpdate(){
  const filterData = {...this.state}
  this.props.sendData(filterData);
 } */
  render() {
    

    const filterPanel = this.props.rules.map(rule => {
      const traitemen = TraitementType(rule.type);
      return (
        <span key={rule.label}>
          {traitemen.type === "number" ? (
            // Number

            <span>
              <TextField
                type="number"
                defaultValue={traitemen.step}
                step={traitemen.step}
                label={rule.label}
                helperText="Min"
                onChange={event => this.handleChange(event, rule.label, "min")}
              />
              <TextField
                type="number"
                defaultValue={traitemen.step}
                step={traitemen.step}
                label={rule.label}
                helperText="Max"
                onChange={event => this.handleChange(event, rule.label, "max")}
              />
            </span>
          ) : null}

          {traitemen.type === "string" ? (
            <TextField
              placeholder={rule.label}
              onChange={event => this.handleChange(event, rule.label)}
            />
          ) : null}

          {traitemen.type === "time" ? (
            <span>
              <TextField
                type="time"
                label={`${rule.label} début`}
                defaultValue={traitemen.defaultValue}
                inputProps={{ step: traitemen.step }}
                onChange={event =>
                  this.handleChange(event, rule.label, "from")
                }
              />

              <TextField
                label={`${rule.label} fin`}
                type={traitemen.type}
                defaultValue={traitemen.defaultValue}
                inputProps={{ step: Number.parseInt(traitemen.step) }}
                onChange={event => this.handleChange(event, rule.label, "to")}
              />
            </span>
          ) : null}

          {traitemen.type === "date" ? (
            <DatePicker sendDatePickerData={this.getDatePickerData} />
          ) : null}

          {traitemen.type === "set" ? (
            <Set
              sendCheckBoxData={this.getCheckBoxData}
              items={traitemen.defaultValue}
              label={rule.label}
            />
          ) : null}
          {traitemen.type === "enum" ? (
            <Enum
              sendRadioData={this.getRadioData}
              items={traitemen.defaultValue}
              label={rule.label}
            />
          ) : null}
        </span>
      );
    });
    return <form>{filterPanel}</form>;
  }
}

export default withStyles(styles)(Filter);
