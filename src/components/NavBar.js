import React, { Component } from 'react';

//Material-ui
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles/";
import { Button } from '@material-ui/core';


const styles = theme => ({
    
    link :{
      textDecoration : "none",
      margin : 20
    }
  });
class NavBar extends Component {
    state = {  
        anchorEl: null,
    }
    
    render() { 
        const {classes} = this.props;
        return (  
           <AppBar position="static" color="primary">
           <ToolBar >
                   <Typography variant="title" color="inherit">
                       AEK work
                   </Typography>

                   <Link to="/" className={classes.link}> <Button variant="contained" color="secondary">Superviseur</Button></Link>
      <Link to="./chef" className={classes.link}><Button variant="contained" color="secondary"> Chef</Button></Link>
      <Link to="./technicien" className={classes.link}><Button variant="contained" color="secondary">Technicien</Button></Link>
     
           </ToolBar>

           </AppBar>
        );
    }
}
 
export default withStyles(styles)(NavBar);