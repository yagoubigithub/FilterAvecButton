import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";

import { Paper, TextField, Button } from "@material-ui/core";
const styles = theme => ({
  root: {
    background: "#f2f2f2"
  },
  textField: {
    margin: 15,
    
    color: "#fff"
  }
  ,cssFocused  : {
    color: purple[500]
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[900],
      fontWeight : "bold",
      fontSize : 20
    },
  },
});

class Filter extends Component {
  state = {
    rules: [
      { label: "nom", type: "varChar" },
      { label: "paragraph", type: "text" },
      { label: "montant", type: "decimale(12,1)" },
      { label: "date", type: "date(day)" },
      { label: "time", type: "Time(s)" }
    ],
    montant: {
      min: 0,
      max: 0
    },
    nom: "",
    paragraph: "",

    date: {
      start: null,
      end: null
    },
    time: {
      start: null,
      end: null
    }
  };

  TraitementType = type => {
    if (/decimale|Decimale/.test(type)) {
      //traitemen decimale
      const NumberZero =
        Number.parseInt(type.slice(type.indexOf(",") + 1, type.length - 1)) - 1;
      const step = "0." + "0".repeat(NumberZero) + "1";
      return { type: "number", step: step, defaultValue: 0 };
    } else if (/varChar|varchar|var-char|var_char/.test(type)) {
      //traitemen varchar
      return { type: "string", step: null };
    } else if (/date|Date/.test(type)) {
      const stepType = type.slice(type.indexOf("(") + 1, type.length - 1);
      const currentDate = new Date()
        .toLocaleDateString()
        .replace(/\//gi, "-")
        .split("-")
        .reverse()
        .join("-");

      switch (stepType) {
        case "day":
          return { type: "date", step: null, defaultValue: currentDate };
          break;
        case "month":
          return { type: "date", step: null, defaultValue: currentDate };
          break;
        case "year":
          return { type: "date", step: null, defaultValue: currentDate };
          break;
      }
    } else if (/time|Time/.test(type)) {
      const stepType = type.slice(type.indexOf("(") + 1, type.length - 1);
      const d = new Date().toTimeString();

      const currentTime = d.slice(0, 8);

      switch (stepType) {
        case "s":
          return {
            type: "time",
            step: 1,
            defaultValue: currentTime.slice(0, currentTime.length - 3)
          };
          break;
        case "m":
          return {
            type: "time",
            step: 120,
            defaultValue: currentTime.slice(0, currentTime.length - 3)
          };
          break;
        case "h":
          return {
            type: "time",
            step: 3600,
            defaultValue: currentTime.slice(0, currentTime.length - 3)
          };
          break;
      }
    } else if (/Text|text/.test(type)) {
      //traitemen varchar
      return { type: "text", step: null };
    }
  };

  handleChange = (event, label, MinOrMax) => {
    switch (label) {
      case "date":
        const date = { ...this.state.date };
        date[MinOrMax] = event.target.value;
        this.setState({ date });

        break;
      case "time":
        const time = { ...this.state.time };
        time[MinOrMax] = event.target.value;
        this.setState({ time });

      case "montant":
        const montant = { ...this.state.montant };
        montant[MinOrMax] = event.target.value;
        this.setState({ montant });
        break;
      default:
        this.setState({ [label]: event.target.value });
        break;

      //sendState();
    }
  };
  render() {
    const { classes } = this.props;

    const filterPanel = this.state.rules.map(rule => {
      const traitemen = this.TraitementType(rule.type);
      return (
        <span key={rule.label}>
          {traitemen.type === "number" ? (
            <React.Fragment>
              <TextField
                className={classes.textField}
                type="number"
                label="Min"
                helperText={rule.label}
                defaultValue={traitemen.step}
                inputProps={{ step: traitemen.step }}
                variant="standard"
                ref={rule.label}
                onChange={event => this.handleChange(event, rule.label, "min")}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }
                }}
              />
              <TextField
                type="number"
                label="Max"
                helperText={rule.label}
                className={classes.textField}
                defaultValue={traitemen.step}
                inputProps={{ step: traitemen.step }}
                onChange={event => this.handleChange(event, rule.label, "max")}
                variant="outlined"
                ref={rule.label}
              />
            </React.Fragment>
          ) : null}

          {traitemen.type === "string" ? (
            <TextField
              label={rule.label}
              className={classes.textField}
              placeholder={rule.label}
              variant="outlined"
              onChange={event => this.handleChange(event, rule.label)}
            />
          ) : null}
          {traitemen.type === "text" ? (
            <TextField
              label={rule.label}
              variant="outlined"
              className={classes.textField}
              multiline
              placeholder={rule.label}
              onChange={event => this.handleChange(event, rule.label)}
            />
          ) : null}

          {traitemen.type === "time" ? (
            <React.Fragment>
              <TextField
                label={`${rule.label} début`}
                type={traitemen.type}
                defaultValue={traitemen.defaultValue}
                inputProps={{ step: traitemen.step }}
                className={classes.textField}
                variant="outlined"
                onChange={event =>
                  this.handleChange(event, rule.label, "start")
                }
                ref={rule.label}
              />

              <TextField
                label={`${rule.label} fin`}
                type={traitemen.type}
                defaultValue={traitemen.defaultValue}
                inputProps={{ step: Number.parseInt(traitemen.step) }}
                className={classes.textField}
                variant="outlined"
                ref={rule.label}
                onChange={event => this.handleChange(event, rule.label, "end")}
              />
            </React.Fragment>
          ) : null}

          {traitemen.type === "date" ? (
            <React.Fragment>
              <TextField
                label={`${rule.label} début`}
                type={traitemen.type}
                defaultValue={traitemen.defaultValue}
                className={classes.textField}
                variant="outlined"
                onChange={event =>
                  this.handleChange(event, rule.label, "start")
                }
                ref={rule.label}
              />

              <TextField
                label={`${rule.label} fin`}
                type={traitemen.type}
                defaultValue={traitemen.defaultValue}
                className={classes.textField}
                variant="outlined"
                ref={rule.label}
                onChange={event => this.handleChange(event, rule.label, "end")}
              />
            </React.Fragment>
          ) : null}
        </span>
      );
    });
    return (
      <Paper className={classes.root}>
        <form>
          <div>
            <Paper className={classes.paper}>{filterPanel}</Paper>
          </div>
          <Button variant="contained" color="primary">
            Reset
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(Filter);
