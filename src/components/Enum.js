import React, { Component } from "react";

import { Radio, FormControlLabel, Divider } from "@material-ui/core";

class Enum extends Component {
  state = {
    selectedValue: this.props.items[0]
  };
  handleChange = event => {
    const selectedValue = event.target.value;
    this.setState({ selectedValue });
    this.props.sendRadioData(selectedValue);
  };
  render() {
    const { items } = this.props;

    const radios = items.map(item => {
      return (
        <React.Fragment  key={item}>
          <FormControlLabel
           
            control={
              <Radio
                checked={this.state.selectedValue === item}
                onChange={this.handleChange}
                value={item}
              />
            }
            label={item}
          />
              <Divider variant="fullWidth" />
        </React.Fragment>
      );
    });

    return <span>{radios}</span>;
  }
}
export default Enum;
