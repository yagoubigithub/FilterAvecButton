import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel, Divider } from "@material-ui/core";

class Set extends Component {
  state = {
      sets : []
  };
  handleChange = event  =>{
    const set = event.target.value;
    const sets = [...this.state.sets];
    
    if(sets.indexOf(set) === -1 ){
        sets.push(set);
    }else{
        sets.splice(sets.indexOf(set),1);
    }
    this.setState({sets})
    this.props.sendCheckBoxData(sets);
  }
  render() {
   
    const { items } = this.props;
    const myCheckboxs = items.map(item => (
      <React.Fragment  key={item}>
        <FormControlLabel
     
        control={<Checkbox value={item} 
        
        onChange={this.handleChange} />}
        label={item}
      />
       <Divider variant="fullWidth" />
      </React.Fragment>
    ));
    return <span>
   
    {myCheckboxs}
    </span>;
  }
}

export default Set;
