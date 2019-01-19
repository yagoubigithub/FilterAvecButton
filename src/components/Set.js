import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel, Divider } from "@material-ui/core";

class Set extends Component {
  state = {
      sets : []
  };
  OnRestSet = () => {
    this.props.items.map((item,index) =>{
      this.setState({[`checkbox${index}`] : false});
      
    });
  }
  componentWillMount(){
    const { items } = this.props;
    items.map((item,index) =>{
      this.setState({[`checkbox${index}`] : false});
      
    });
  }
  handleChange =( event,checkbox)  =>{
    const set = event.target.value;
    const sets = [...this.state.sets];
    this.setState({[checkbox] : !this.state[checkbox]});
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
    const myCheckboxs = items.map((item,index) => (
      <React.Fragment  key={item}>
        <FormControlLabel
     
        control={<Checkbox
         value={item} 
         checked={this.state[`checkbox${index}`]}
        
        onChange={(event)=>this.handleChange(event,[`checkbox${index}`])} />}
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
