import React, { Component } from "react";

import { Radio, FormControlLabel } from "@material-ui/core";

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
        <FormControlLabel
          key={item}
          control={
            <Radio
              checked={this.state.selectedValue === item}
              onChange={this.handleChange}
              value={item}
            />
          }
          label={item}
        />
      );
    });

    return (
      <span>
        
        {radios}
      </span>
    );
  }
}
export default Enum;
