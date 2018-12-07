import React, { Component } from "react";
import Technicien from "./technicien";

class Chef extends Component {
  state = {
    chef_response: this.props.chef
  };
  render() {
    const { techniciens } = this.state.chef_response;
    return (
      <React.Fragment>
     
        {techniciens.map(technicien => (
          <React.Fragment key={technicien.id_technicien}>
            <Technicien technicien={technicien} />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default Chef;
