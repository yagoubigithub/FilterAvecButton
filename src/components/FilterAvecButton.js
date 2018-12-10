import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { TextField, Fab, Paper } from "@material-ui/core";
import { TraitementType } from "./Utils";
import DatePicker from "./Date";
import MultiSelect from "./Select";
import Grid from "@material-ui/core/Grid";

import Search from "@material-ui/icons/Search";
import Set from "./Set";
import Enum from "./Enum";
const styles = theme =>
  console.log(theme) || {
    
    paper : {
        width : '100%',
        display : "flex"
        ,flexDirection : "row",
        padding : 10,
        justifyContent: 'space-between'
    },
    textField : {
        width : 300
    }
  };

class FilterAvecButton extends Component {
  state = {};
  getRadioCheckboxData = (val, label) => {
    this.setState({ [label]: val });
  };

  handleChange = (event, label, MinOrMax) => {
    if (MinOrMax) {
      //const v = { ...this.state[label] };
      if (this.state[label]) {
        const v = { ...this.state[label] };
        v[MinOrMax] = event.target.value;
        this.setState({ [label]: v });
      } else {
        this.setState({ [label]: { [MinOrMax]: event.target.value } });
      }
    } else {
      this.setState({ [label]: event.target.value });
    }
  };
  handeleClick = () => {
    const filterData = { ...this.state };
    this.props.sendData(filterData);
  };
  getDatePickerData = val => {
    if (this.state.date) {
      const date = { ...this.state.date };
      if (val.from) {
        date.from = val.from;
        this.setState({ date });
      } else {
        date.to = val.to;
        this.setState({ date });
      }
    } else {
      this.setState({ date: val });
    }
  };
  getMultiSelectValue = (val, label) => {
    this.setState({ [label]: val });
  };

  render() {
    const { classes } = this.props;
    let count = 0;
   let grids = [];

    const filterPanel = this.props.rules.map(rule => {
      const traitemen = TraitementType(rule.type);
      count++;
       grids.push(<span style={{width : '33%'}} key={rule.label}>
        {traitemen.type === "number" ? (
          // Number

          <span>
            <TextField
           
              type="number"
              defaultValue={traitemen.step}
              step={traitemen.step}
              label={rule.label}
              helperText="Min"
              onChange={event =>
                this.handleChange(event, rule.label, "min")
              }
            />
            <TextField
              type="number"
              defaultValue={traitemen.step}
              step={traitemen.step}
              label={rule.label}
              helperText="Max"
              onChange={event =>
                this.handleChange(event, rule.label, "max")
              }
            />
          </span>
        ) : null}

        {traitemen.type === "string" ? (
          <TextField
            placeholder={rule.label}
            onChange={event => this.handleChange(event, rule.label)}
            className={classes.textField}
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
              style={{width : 150,margin : 5}}
            />

            <TextField
              label={`${rule.label} fin`}
              type={traitemen.type}
              defaultValue={traitemen.defaultValue}
              inputProps={{ step: Number.parseInt(traitemen.step) }}
              onChange={event => this.handleChange(event, rule.label, "to")}
              style={{width : 150,margin : 5}}
            />
          </span>
        ) : null}

        {traitemen.type === "date" ? (
          <DatePicker sendDatePickerData={this.getDatePickerData} />
        ) : null}

        {traitemen.type === "set" ? (
          <Set
            sendCheckBoxData={val =>
              this.getRadioCheckboxData(val, rule.label)
            }
            items={traitemen.defaultValue}
            label={rule.label}
          />
        ) : null}
        {traitemen.type === "enum" ? (
          <Enum
            sendRadioData={val =>
              this.getRadioCheckboxData(val, rule.label)
            }
            items={traitemen.defaultValue}
            label={rule.label}
          />
        ) : null}

        {traitemen.type === "Select-Multiple" ? (
          <MultiSelect
            options={traitemen.defaultValue}
            placeholder={rule.label}
            sendMultiSelectData={val =>
              this.getMultiSelectValue(val, rule.label)
            }
          />
        ) : null}
      </span>);
      if(count % 3 === 0){
          const item = [...grids];
          grids = [];
          return <Grid item xs={12}><Paper className={classes.paper}>{item}</Paper></Grid>
      }
      
      
      
    });
    return (
      <Grid container spacing={16}>
        {filterPanel}
        <Fab color="primary" size="small" onClick={this.handeleClick}>
          <Search />
        </Fab>
      </Grid>
    );
  }
}

export default withStyles(styles)(FilterAvecButton);
