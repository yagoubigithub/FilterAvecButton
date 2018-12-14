import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper } from "@material-ui/core";
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
      width: "100%"
    },
    grid: {
      maxWidth: "100%"
    }
  };


class FilterAvecButton extends Component {
  state = {
    minmax: {},
    serch: {},
    array: {}
  };
  getCheckboxData = (val, label, type) => {
    let array = { ...this.state.array };
    array[label] = { value: val, type: type };
    this.setState({ array });
  };
  getRadioData = (val, label, type) => {
    let serch = { ...this.state.serch };
    serch[label] = { value: val, type: type };
    this.setState({ serch });
  };

  handleChange = (event, label, MinOrMax, type) => {
    let minmax = {
      ...this.state.minmax
    };
    let serch = { ...this.state.serch };
    if (MinOrMax) {
      if (minmax[label]) {
        const myLabel = { ...minmax[label] };
        myLabel.value[MinOrMax] = event.target.value;
        minmax[label] = myLabel;
        this.setState({ minmax });
      } else {
        minmax[label] = {
          value: { [MinOrMax]: event.target.value },
          type: type
        };
        this.setState({ minmax });
      }
    } else {
      serch[label] = { value: event.target.value, type: type };

      this.setState({ serch });
    }
  };
  handeleClick = () => {
    const filterData = { ...this.state };
    this.props.sendData(filterData);
  };
  getDatePickerData = (val, label) => {
    const minmax = { ...this.state.minmax };
    if (this.state.minmax[label]) {
      const myLabel = { ...this.state.minmax[label] };
      if (val.from) {
        myLabel.value.from = val.from;
      } else {
        myLabel.value.to = val.to;
      }
      minmax[label] = myLabel;
    } else {
      minmax[label] = { value: val, type: "date" };
    }
    this.setState({ minmax });
  };
  getMultiSelectValue = (val, label, returnType, type) => {
    if (returnType) {
      const array = { ...this.state.array };
      array[label] = { value: val.map(v => v.value), type: type };
      this.setState({ array });
    } else {
      const serch = { ...this.state.serch };
      serch[label] = { value: val.value, type: type };
      this.setState({ serch });
    }
  };

  render() {
    const { classes } = this.props;

    const filterPanel = this.props.rules.map(rule => {
      const traitemen = TraitementType(rule.type);
      rule.label = rule.label.trim();

      return (
        <Grid xs={6} sm={3} item key={rule.label}>
          <Paper className={classes.container}>
            {traitemen.type === "number" &&
            traitemen.returnType === "minmax" ? (
              // Number minmax

              <span>
                <TextField
                  type="number"
                  defaultValue={traitemen.step}
                  step={traitemen.step}
                  label={rule.label}
                  helperText="Min"
                  className={classes.textField}
                  style={{ width: "50%" }}
                  onChange={event =>
                    this.handleChange(event, rule.label, "min", "number")
                  }
                />
                <TextField
                  type="number"
                  defaultValue={traitemen.step}
                  step={traitemen.step}
                  label={rule.label}
                  helperText="Max"
                  className={classes.textField}
                  style={{ width: "50%" }}
                  onChange={event =>
                    this.handleChange(event, rule.label, "max", "number")
                  }
                />
              </span>
            ) : null}
            {traitemen.type === "number" &&
            traitemen.returnType !== "minmax" ? (
              // Number

              <span>
                <TextField
                  type="number"
                  defaultValue={traitemen.step}
                  step={traitemen.step}
                  label={rule.label}
                  className={classes.textField}
                  onChange={event =>
                    this.handleChange(event, rule.label, null, "number")
                  }
                />
              </span>
            ) : null}

            {traitemen.type === "string" ? (
              <TextField
                placeholder={rule.label}
                onChange={event =>
                  this.handleChange(event, rule.label, null, "string")
                }
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
                  onChange={event =>
                    this.handleChange(event, rule.label, "start", "time")
                  }
                  style={{ width: "50%" }}
                  className={classes.textField}
                />

                <TextField
                  label={`${rule.label} fin`}
                  type={traitemen.type}
                  defaultValue={traitemen.defaultValue}
                  inputProps={{ step: Number.parseInt(traitemen.step) }}
                  onChange={event =>
                    this.handleChange(event, rule.label, "end", "time")
                  }
                  style={{ width: "50%" }}
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
                  onChange={event =>
                    this.handleChange(event, rule.label, null, "time")
                  }
                  className={classes.textField}
                />
              </span>
            ) : null}

            {traitemen.type === "date" && traitemen.returnType === "minmax" ? (
              <DatePicker
                sendDatePickerData={val =>
                  this.getDatePickerData(val, rule.label)
                }
              />
            ) : null}
            {traitemen.type === "date" && traitemen.returnType !== "minmax" ? (
              <TextField
                type="date"
                label={rule.label}
                defaultValue={traitemen.defaultValue}
                onChange={event =>
                  this.handleChange(event, rule.label, null, "date")
                }
                style={{ margin: 5 }}
                className={classes.textField}
              />
            ) : null}

            {traitemen.type === "set" ? (
              <Set
                sendCheckBoxData={val =>
                  this.getCheckboxData(
                    val,
                    rule.label,
                    isNaN(val) ? "string" : "number"
                  )
                }
                items={traitemen.defaultValue}
                label={rule.label}
              />
            ) : null}
            {traitemen.type === "enum" ? (
              <Enum
                sendRadioData={val =>
                  this.getRadioData(
                    val,
                    rule.label,
                    isNaN(val) ? "string" : "number"
                  )
                }
                items={traitemen.defaultValue}
                label={rule.label}
              />
            ) : null}

            {traitemen.type === "Select" &&
            traitemen.returnType === "multiple" ? (
              <MultiSelect
                options={traitemen.defaultValue}
                placeholder={rule.label}
                sendMultiSelectData={val =>
                  this.getMultiSelectValue(
                    val,
                    rule.label,
                    "multiple",
                    isNaN(val[0].value) ? "string" : "number"
                  )
                }
                isMulti={true}
              />
            ) : null}
            {traitemen.type === "Select" &&
            traitemen.returnType !== "multiple" ? (
              <MultiSelect
                options={traitemen.defaultValue}
                placeholder={rule.label}
                sendMultiSelectData={val =>
                  this.getMultiSelectValue(
                    val,
                    rule.label,
                    null,
                    isNaN(val.value) ? "string" : "number"
                  )
                }
                isMulti={false}
              />
            ) : null}
          </Paper>
        </Grid>
      );
    });
    return (
      <div className={classes.container}>
        <Grid
          direction="row"
          justify="center"
          alignItems="baseline"
          className={classes.grid}
          container
          spacing={8}
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
