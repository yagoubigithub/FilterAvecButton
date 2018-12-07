import React, { Component } from 'react';
import Chef from './Chef';
import { Typography } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';

class Superviseur extends Component {
    state = { 
        response : null

     }
     componentDidMount(){
       this.fetchData();
     }

     fetchData = () =>{
       fetch('https://yagoubi.000webhostapp.com/JSON/v1/super.json')
       .then(response => response.json())
       .then(response => this.setState({response}))
       .catch(error => console.log("error fetch :" + error));
     }
    render() { 
      if(this.state.response !== null){
        const {equipes} = this.state.response;
        return ( 
            <React.Fragment>

        {equipes.map(equipe => (
          <React.Fragment key={equipe.id_equipe}>
          <Typography variant="display3" >{equipe.nom_equipe}</Typography>
            <Chef chef={equipe} />
          </React.Fragment>
        ))}

            </React.Fragment>
         );
      }else{
        return(
          <React.Fragment>
          <CircularProgress />
          </React.Fragment>

        );
      }
       
    }
}
 
export default Superviseur;