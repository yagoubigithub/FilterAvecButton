import React, { Component } from 'react';
import Select from 'react-select';

import purple  from '@material-ui/core/colors/purple'

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    })
  }
class MultiSelect extends Component {
   
    state = {
        selectedOption: null,
      }
      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.sendMultiSelectData(selectedOption);
        
      }
    render() { 
        const { selectedOption } = this.state;
        return (
            <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={this.props.options}
            isMulti={this.props.isMulti}
            isSearchable
            placeholder={this.props.placeholder}
            styles={customStyles}
           
          />
          );
    }
}
 
export default MultiSelect;