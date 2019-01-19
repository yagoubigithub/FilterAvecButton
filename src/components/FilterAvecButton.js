import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, IconButton } from "@material-ui/core";
import { TraitementType } from "./Utils";
import DatePicker from "./Date";
import MultiSelect from "./Select";
import Search from "@material-ui/icons/Search";
import Set from "./Set";
import Enum from "./Enum";
import { Shuffle, ImportExport,Replay } from "@material-ui/icons";
const styles = theme => ({
  container: {
    padding: 5,
    boxSizing: "border-box",
    margin: 5
  },

  textField: {
    width: "80%"
  },
  IconButton: {
    maxWidth: "19%"
  },
  Paper: {
    padding: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end"
  }
});

class FilterAvecButton extends Component {
  state = {};
  getCheckboxData = (val, label) => {
    this.setState({ [label]: { aray: val } });
  };
  getRadioData = (val, label) => {
    this.setState({ [label]: { serch: val } });
  };

  handleChange = (event, label, MinOrMax, type) => {
    if (MinOrMax) {
      if (this.state[label]) {
        const myLabel = { ...this.state[label] };
        myLabel[MinOrMax] = event.target.value;

        this.setState({ [label]: myLabel });
      } else {
        this.setState({ [label]: { [MinOrMax]: event.target.value } });
      }
    } else {
      this.setState({ [label]: { serch: event.target.value } });
    }
  };
  handeleClick = () => {
    const filterData = { ...this.state };
    delete filterData.traitemens;
    Object.keys(filterData).map(key => {
      if (filterData[key] === undefined) {
        delete filterData[key];
      }
    });
    this.props.sendData(filterData);
  };
  getDatePickerData = (val, label) => {
    if (this.state[label]) {
      const myLabel = { ...this.state[label] };
      if (val.from) {
        myLabel.from = val.from;
      } else {
        myLabel.to = val.to;
      }
      this.setState({ [label]: myLabel });
    } else {
      this.setState({ [label]: val });
    }
  };
  getMultiSelectValue = (val, label, returnType) => {
      if (returnType) {
       if (val.length > 0) 
        this.setState({ [label]: { array: val.map(v => v.value) } });
         
      } else {
        if(val)
        this.setState({ [label]: { serch: val.value } });
      }
    
  };
  ChangeToSerch = (item, index) => {
    //console.log(item);
    const traitemens = [...this.state.traitemens];
    traitemens[index].traitemen.returnType = "serch";
    this.setState({ [item.rule.label.trim()]: undefined });
    this.setState({ traitemens });
  };
  ChangeToMinMax = (item, index) => {
    //console.log(item);
    const traitemens = [...this.state.traitemens];
    traitemens[index].traitemen["returnType"] = "minmax";
    this.setState({ [item.rule.label.trim()]: undefined });
    this.setState({ traitemens });
    // Check browser support
  };

  Rest = () => {
    const state = { ...this.state };
    this.state.traitemens.map((item) => {
      if(item.traitemen.type === "Select"){
        this[`${item.rule.label}select`].OnRestSelect();
       

      }else if(item.traitemen.type === "set"){
        this[`${item.rule.label}set`].OnRestSet();
      }
    });
    Object.keys(state).map(key => {
      this.setState({ [key]: undefined });
    });

    this.setState({
      traitemens: JSON.parse(localStorage.getItem("defaultTraitemens"))
    });
    

    
  };

  componentWillMount() {
    const traitemens = this.props.rules.map(rule => {
      return { rule: rule, traitemen: TraitementType(rule.type, rule.label) };
    });

    this.setState({ traitemens });
    if (typeof Storage !== "undefined") {
      // Store

      localStorage.setItem("defaultTraitemens", JSON.stringify(traitemens));
    } else {
      alert("Sorry, your browser does not support Web Storage...");
    }
  }
 
  render() {
    const { classes } = this.props;

    const filterPanel = this.state.traitemens.map((item, index) => {
      item.rule.label = item.rule.label.trim();

      return (
        <Paper
          className={classes.container}
          style={{
            width: `${item.traitemen.width}`,
            height: "auto",
            minWidth: `${this.props.minWidth}px`,
            maxWidth: `${this.props.maxWidth}px`
          }}
          key={item.rule.label}
        >
          {item.traitemen.type === "number" &&
          item.traitemen.returnType === "minmax" ? (
            // Number minmax

            <span>
              <TextField
                type="number"
                value={
                  this.state[item.rule.label] === undefined
                    ? item.traitemen.step || 0
                    : this.state[item.rule.label].min || 0
                }
                inputProps={{ step: item.traitemen.step }}
                label={item.rule.label}
                helperText="Min"
                style={{ width: "40%" }}
                onChange={event =>
                  this.handleChange(event, item.rule.label, "min", "number")
                }
              />
              <TextField
                type="number"
                value={
                  this.state[item.rule.label] === undefined
                    ? item.traitemen.step || 0
                    : this.state[item.rule.label].max || 0
                }
                inputProps={{ step: item.traitemen.step }}
                label={item.rule.label}
                helperText="Max"
                style={{ width: "40%" }}
                onChange={event =>
                  this.handleChange(event, item.rule.label, "max", "number")
                }
              />
            </span>
          ) : null}
          {item.traitemen.type === "number" &&
          item.traitemen.returnType !== "minmax" ? (
            // Number

            <span>
              <TextField
                type="number"
                value={
                  this.state[item.rule.label] === undefined
                    ? item.traitemen.step || 0
                    : this.state[item.rule.label].serch || 0
                }
                inputProps={{ step: item.traitemen.step }}
                label={item.rule.label}
                className={classes.textField}
                onChange={event =>
                  this.handleChange(event, item.rule.label, null, "number")
                }
              />
            </span>
          ) : null}

          {item.traitemen.type === "string" ? (
            <TextField
              rows={item.traitemen.rows !== null ? item.traitemen.rows : 1}
              placeholder={item.rule.label}
              value={
                this.state[item.rule.label] === undefined
                  ? ""
                  : this.state[item.rule.label].serch || ""
              }
              multiline={item.traitemen.multiline}
              onChange={event =>
                this.handleChange(event, item.rule.label, null, "string")
              }
              className={classes.textField}
              style={{ width: "100%" }}
            />
          ) : null}

          {item.traitemen.type === "time" &&
          item.traitemen.returnType === "minmax" ? (
            <span>
              <TextField
                type="time"
                label={`${item.rule.label} début`}
                value={
                  this.state[item.rule.label] === undefined
                    ? item.traitemen.defaultValue
                    : this.state[item.rule.label].start ||
                      item.traitemen.defaultValue
                }
                inputProps={{ step: item.traitemen.step }}
                onChange={event =>
                  this.handleChange(event, item.rule.label, "start", "time")
                }
                style={{ width: "40%" }}
              />

              <TextField
                label={`${item.rule.label} fin`}
                type={item.traitemen.type}
                value={
                  this.state[item.rule.label] === undefined
                    ? item.traitemen.defaultValue
                    : this.state[item.rule.label].end ||
                      item.traitemen.defaultValue
                }
                inputProps={{ step: Number.parseInt(item.traitemen.step) }}
                onChange={event =>
                  this.handleChange(event, item.rule.label, "end", "time")
                }
                style={{ width: "40%" }}
              />
            </span>
          ) : null}

          {item.traitemen.type === "time" &&
          item.traitemen.returnType !== "minmax" ? (
            <span>
              <TextField
                type="time"
                label={item.rule.label}
                value={
                  this.state[item.rule.label] === undefined
                    ? item.traitemen.defaultValue
                    : this.state[item.rule.label].serch ||
                      item.traitemen.defaultValue
                }
                inputProps={{ step: item.traitemen.step }}
                onChange={event =>
                  this.handleChange(event, item.rule.label, null, "time")
                }
                className={classes.textField}
              />
            </span>
          ) : null}

          {item.traitemen.type === "date" &&
          item.traitemen.returnType === "minmax" ? (
            <DatePicker
              className={classes.textField}
              sendDatePickerData={val =>
                this.getDatePickerData(val, item.rule.label)
              }
            />
          ) : null}
          {item.traitemen.type === "date" &&
          item.traitemen.returnType !== "minmax" ? (
            <TextField
              type="date"
              label={item.rule.label}
              value={
                this.state[item.rule.label] === undefined
                  ? item.traitemen.defaultValue
                  : this.state[item.rule.label].serch ||
                    item.traitemen.defaultValue
              }
              onChange={event =>
                this.handleChange(event, item.rule.label, null, "date")
              }
              style={{ margin: 5 }}
              className={classes.textField}
            />
          ) : null}

          {item.traitemen.type === "set" ? (
            <Set
            ref={input => (this[`${item.rule.label}set`] = input)}
              sendCheckBoxData={val =>
                this.getCheckboxData(
                  val,
                  item.rule.label,
                  isNaN(val) ? "string" : "number"
                )
              }
              items={item.traitemen.defaultValue.map(item => item.value)}
              label={item.rule.label}
            />
          ) : null}
          {item.traitemen.type === "enum" ? (
            <Enum
              sendRadioData={val =>
                this.getRadioData(
                  val,
                  item.rule.label,
                  isNaN(val) ? "string" : "number"
                )
              }
              
              items={item.traitemen.defaultValue.map(item => item.value)}
              label={item.rule.label}
            />
          ) : null}

          {item.traitemen.type === "Select"
           ? (
            <MultiSelect
              options={item.traitemen.defaultValue}
              placeholder={item.rule.label}
              ref={input => (this[`${item.rule.label}select`] = input)}
              sendMultiSelectData={val =>
                this.getMultiSelectValue(
                  val,
                  item.rule.label,
                  item.traitemen.returnType === "multiple" ? "multiple" : false
                  
                )
              }
              isMulti={item.traitemen.returnType === "multiple" ? true : false}
            />
          ) : null}
         
          {item.traitemen.returnType === "minmax" ? (
            <IconButton
              className={classes.IconButton}
              onClick={() => this.ChangeToSerch(item, index)}
            >
              <ImportExport />
            </IconButton>
          ) : null}
          {item.traitemen.returnType !== "minmax" &&
          (item.traitemen.type === "number" ||
            item.traitemen.type === "date" ||
            item.traitemen.type === "time") ? (
            <IconButton
              className={classes.IconButton}
              onClick={() => this.ChangeToMinMax(item, index)}
            >
              <Shuffle />
            </IconButton>
          ) : null}
        </Paper>
      );
    });
    return (
      <div className={classes.container}>
        <Paper className={classes.Paper}>{filterPanel}</Paper>
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
          <Button
            variant="contained"
            style={{ margin: 5 }}
            color="primary"
            size="small"
            onClick={this.Rest}
          >
           <Replay />
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FilterAvecButton);
