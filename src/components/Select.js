import React, { Component } from 'react';
import Select from 'react-select';


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
        selectedOption:  null,
      }
      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.sendMultiSelectData(selectedOption);
        
      }
      OnRestSelect = () => {
       
        this.setState({ selectedOption : null });
      }
    render() { 
        const { selectedOption } = this.state;
        return (
          <React.Fragment>
            <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={this.props.options}
            isMulti={this.props.isMulti}
            isSearchable={true}
            isClearable={true}
            placeholder={this.props.placeholder}
            styles={customStyles}
           
          />
          </React.Fragment>
          );
    }
}
 
export default MultiSelect;