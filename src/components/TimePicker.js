import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  TimePickerContainer: {
    display: "flex",
    width: 200,
    flexDirection: "column"
  }
});
class TimeRangePicker extends Component {
  state = {};
  onChange = time => {
    console.log(time);
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Typography variant="body2">Date Début</Typography>
        <TextField type="time" />
        <Typography variant="body2">Date fin</Typography>
        <TextField type="time" />
      </Card>
    );
  }
}

export default withStyles(styles)(TimeRangePicker);
