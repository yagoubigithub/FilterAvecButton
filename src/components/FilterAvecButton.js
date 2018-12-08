import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { TextField, Fab } from "@material-ui/core";
import { TraitementType } from "./Utils";
import DatePicker from "./Date";
import Search from "@material-ui/icons/Search";

import Set from "./Set";
import Enum from "./Enum";
const styles = theme =>
  console.log(theme) || {
    TextFieldContainer: {
      display: "flex",
      width: 400
    }
  };

class FilterAvecButton extends Component {
  state = {
    
  };
  getRadioCheckboxData = (val,label) => {
    
    
    this.setState({ [label] : val });
  };
  
  handleChange = (event, label, MinOrMax) => {
   if(MinOrMax){
    /* if(this.state[label] === undefined){
        this.setState({ [label] : {} });
        const newLabel = {...this.state[label]};
        newLabel[MinOrMax]  = event.target.value;
        this.setState({newLabel});
    } */
    
   }else{
    this.setState({ [label] : event.target.value });
   }
  };
  handeleClick = () => {
    const { filterData } = { ...this.state };
    this.props.sendData(filterData);
  };
 
  render() {
    const { classes } = this.props;

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
                onChange={event => this.handleChange(event, rule.label, "from")}
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
              sendCheckBoxData={(val)=>this.getRadioCheckboxData(val,rule.label)}
              items={traitemen.defaultValue}
              label={rule.label}
            />
          ) : null}
          {traitemen.type === "enum" ? (
            <Enum
              sendRadioData={(val)=>this.getRadioCheckboxData(val,rule.label)}
              items={traitemen.defaultValue}
              label={rule.label}

            />
          ) : null}
        </span>
      );
    });
    return (
      <form>
        {filterPanel}
        <Fab color="primary" size="small" onClick={this.handeleClick}>
          <Search />
        </Fab>
      </form>
    );
  }
}

export default withStyles(styles)(FilterAvecButton);
