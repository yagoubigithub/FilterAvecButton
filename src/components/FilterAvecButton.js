import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { TraitementType } from "./Utils";
import DatePicker from "./Date";
import MultiSelect from "./Select";
import Grid from "@material-ui/core/Grid";
import Search from "@material-ui/icons/Search";
import Set from "./Set";
import Enum from "./Enum";
const styles = theme =>
  console.log(theme) || {
    container: {
      padding: 5
    },

    textField: {
      width: 150,
      margin: 5
    },
    grid: {
      maxWidth: "100%"
    }
  };

// date => 4
//react-multimedia-capture
//js media devices

class FilterAvecButton extends Component {
  state = {
    minmax: {},
    serch: {},
    array: {}
  };
  getCheckboxData = (val, label) => {
    let array = { ...this.state.array };
    array[label] = val;
    this.setState({ array });
  };
  getRadioData = (val, label) => {
    let serch = { ...this.state.serch };
    serch[label] = val;
    this.setState({ serch });
  };

  handleChange = (event, label, MinOrMax) => {
  let minmax = {
      ...this.state.minmax
    };
    let serch = { ...this.state.serch };
    if (MinOrMax) {
    

      if (minmax[label]) {
        const myLabel = { ...minmax[label] };
        myLabel[MinOrMax] = event.target.value;
        minmax[label] = myLabel;
        this.setState({ minmax });
      } else {
        minmax[label] = { [MinOrMax]: event.target.value };
        this.setState({ minmax });
      }
    } else {
      serch[label] = event.target.value;

      this.setState({ serch });
    }
  };
  handeleClick = () => {
    const filterData = { ...this.state };
    this.props.sendData(filterData);
  };
  getDatePickerData = val => {
    const minmax = { ...this.state.minmax };
    if (this.state.minmax.date) {
      if (val.from) {
        minmax.date.from = val.from;
      } else {
        minmax.date.to = val.to;
      }
    } else {
      minmax.date = val;
    }
    this.setState({ minmax });
  };
  getMultiSelectValue = (val, label,returnType) => {
    if(returnType){
      const array = {...this.state.array};
      array[label] = val.map(v=>v.value);
      this.setState({ array });
    }else{
      const serch = {...this.state.serch};
      serch[label] = val.value;
      this.setState({ serch });
    }
   
  };

  render() {
    const { classes } = this.props;
    

    const filterPanel = this.props.rules.map(rule => {
      const traitemen = TraitementType(rule.type);
      rule.label = rule.label.trim();

      return (
        <Grid xs={12} sm={4} item key={rule.label}>
      
          {traitemen.type === "number" && traitemen.returnType === "minmax" ? (
            // Number minmax

            <span>
              <TextField
                type="number"
                defaultValue={traitemen.step}
                step={traitemen.step}
                label={rule.label}
                helperText="Min"
                className={classes.textField}
                onChange={event => this.handleChange(event, rule.label, "min")}
              />
              <TextField
                type="number"
                defaultValue={traitemen.step}
                step={traitemen.step}
                label={rule.label}
                helperText="Max"
                className={classes.textField}
                onChange={event => this.handleChange(event, rule.label, "max")}
              />
            </span>
          ) : null}
          {traitemen.type === "number" && traitemen.returnType !== "minmax" ? (
            // Number

            <span>
              <TextField
                type="number"
                defaultValue={traitemen.step}
                step={traitemen.step}
                label={rule.label}
                className={classes.textField}
                onChange={event => this.handleChange(event, rule.label)}
              />
            </span>
          ) : null}

          {traitemen.type === "string" ? (
            <TextField
              placeholder={rule.label}
              onChange={event => this.handleChange(event, rule.label)}
              className={classes.textField}
              className={classes.textField}
            />
          ) : null}

          {traitemen.type === "time" && traitemen.returnType === "minmax" ? (
            <span>
              <TextField
                type="time"
                label={`${rule.label} début`}
                defaultValue={traitemen.defaultValue}
                inputProps={{ step: traitemen.step }}
                onChange={event => this.handleChange(event, rule.label, "start")}
                style={{ margin: 5 }}
                className={classes.textField}
              />

              <TextField
                label={`${rule.label} fin`}
                type={traitemen.type}
                defaultValue={traitemen.defaultValue}
                inputProps={{ step: Number.parseInt(traitemen.step) }}
                onChange={event => this.handleChange(event, rule.label, "end")}
                style={{ margin: 5 }}
                className={classes.textField}
              />
            </span>
          ) : null}

           {traitemen.type === "time" && traitemen.returnType !== "minmax" ? (
            <span>
              <TextField
                type="time"
                label={rule.label}
                defaultValue={traitemen.defaultValue}
                inputProps={{ step: traitemen.step }}
                onChange={event => this.handleChange(event, rule.label)}
                style={{ margin: 5 }}
                className={classes.textField}
              />

            </span>
          ) : null}

          {traitemen.type === "date" && traitemen.returnType === "minmax" ? (
            <DatePicker sendDatePickerData={this.getDatePickerData} />
          ) : null}
          {traitemen.type === "date" && traitemen.returnType !== "minmax" ? (
            <TextField
                type="date"
                label={rule.label}
                defaultValue={traitemen.defaultValue}
                
                onChange={event => this.handleChange(event, rule.label)}
                style={{ margin: 5 }}
                className={classes.textField}
              />
          ) : null}

          {traitemen.type === "set" ? (
            <Set
              sendCheckBoxData={val => this.getCheckboxData(val, rule.label)}
              items={traitemen.defaultValue}
              label={rule.label}
            />
          ) : null}
          {traitemen.type === "enum" ? (
            <Enum
              sendRadioData={val => this.getRadioData(val, rule.label)}
              items={traitemen.defaultValue}
              label={rule.label}
            />
          ) : null}

          {traitemen.type === "Select"  && traitemen.returnType === "multiple" ? (
            <MultiSelect
              options={traitemen.defaultValue}
              placeholder={rule.label}
              sendMultiSelectData={val =>
                this.getMultiSelectValue(val, rule.label,"multiple")
              }
              isMulti={true}
            />
          ) : null}
          {traitemen.type === "Select" && traitemen.returnType !== "multiple" ? (
            <MultiSelect
              options={traitemen.defaultValue}
              placeholder={rule.label}
              sendMultiSelectData={val =>
                this.getMultiSelectValue(val, rule.label)
              }
              isMulti={false}
            />
          ) : null}
        </Grid>
      );
    });
    return (
      <div className={classes.container}>
        <Grid
          direction="row"
          justify="space-evenly"
          alignItems="center"
          className={classes.grid}
          container
          spacing={16}
        >
          {filterPanel}
        </Grid>
        <div dir="rtl">
          <Button
            variant="contained"
            style={{ margin: 5 }}
            color="primary"
            size="small"
            onClick={this.handeleClick}
          >
            <Search />
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FilterAvecButton);
