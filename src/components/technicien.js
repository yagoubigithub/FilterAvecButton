import React, { Component } from "react";

import {
  TextField,
  Divider,
  Button,
  FormGroup,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles/";
import Paper from "@material-ui/core/Paper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";




const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  paper :{
    margin : 15,
    padding: 15
  },
  submitButton : {
    margin : 15
    
  }
});
class Technicien extends Component {
  state = {
    technicien_response: this.props.technicien,
    technicien_checkbox : true,
    Superviseur_checkbox :false,
    Chef_checkbox : false
  };
  handeleCheckbox = role => event =>{
        this.setState({[role] : event.target.checked});
  }
  SendData = event => {
    event.preventDefault();
   
    
    
  }

  handelechange = (key , event ) => {
    const technicien_response = {...this.state.technicien_response}
    technicien_response[key] = event.target.value;
    this.setState({technicien_response});
    console.log(technicien_response);
  }
  render() {
    const { classes } = this.props;
    const {deplacements} = this.state.technicien_response;
    return (<React.Fragment >
 <Paper className={classes.paper}>
 
          <form noValidate autoComplete="off" onSubmit={e=>this.SendData(e)}>
            <TextField
              required
              className={classes.textField}
              label="Nom de technicien"
              defaultValue={this.state.technicien_response.nom_technicien}
              margin="normal"
             onChange={e => this.handelechange("nom_technicien",e)}
            />
            <br />
            <TextField
              required
              className={classes.textField}
              label="tel de technicien"
              defaultValue={this.state.technicien_response.tel_technicien}
              margin="normal"
              onChange={e => this.handelechange("tel_technicien",e)}
            />
            <br />
           
            
            {/*

          */}
          <br />
          <Divider />
          <br />
          <Typography variant="h5">Tout les deplacements : </Typography>
          {Object.keys(deplacements).map(keydeplacement =>
          Object.keys(deplacements[keydeplacement]).map(key => (
            <div key={deplacements[keydeplacement][key].id_deplacement}>
              <ExpansionPanel className={classes.container}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    className={classes.heading}
                  >{`deplacement de date : ${keydeplacement}`}</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                  <div>
                    <Paper className={classes.paper}>
                    
                      <TextField
                        type="date"
                        label="date de début de déplacement"
                        defaultValue={deplacements[keydeplacement][key].date_debut_deplacement}
                        className={classes.textField}
                        onChange={e => this.handelechange("nom_technicien",e)}
                      />
                      <TextField
                        type="time"
                        label="heure de début de déplacement"
                        defaultValue={deplacements[keydeplacement][key].heure_debut_deplacement}
                        className={classes.textField}
                        onChange={e => this.handelechange("nom_technicien",e)}
                      />
                    </Paper>
                    <Paper className={classes.paper}>
                    
                      <TextField
                        type="date"
                        label="date de fin de déplacement"
                        defaultValue={deplacements[keydeplacement][key].date_fin_deplacement}
                        className={classes.textField}
                        onChange={e => this.handelechange("nom_technicien",e)}
                      />
                      <TextField
                        type="time"
                        label="heure de fin de déplacement"
                        defaultValue={deplacements[keydeplacement][key].heure_fin_deplacement}
                        className={classes.textField}
                        onChange={e => this.handelechange("nom_technicien",e)}
                      />
                    </Paper>
                    <Paper className={classes.paper}>
                    <TextField
                      required
                      className={classes.textField}
                      label="Adresse intervention"
                      defaultValue={
                        deplacements[keydeplacement][key].adresse_intervention
                      }
                      margin="normal"
                      onChange={e => this.handelechange("nom_technicien",e)}
                    />
                    <TextField
                      required
                      className={classes.textField}
                      label="Type intervention"
                      defaultValue={
                        deplacements[keydeplacement][key].type_intervention
                      }
                      margin="normal"
                      onChange={e => this.handelechange("nom_technicien",e)}
                    />

                    <TextField
                      required
                      className={classes.textField}
                      label="Client Intervention"
                      defaultValue={
                        deplacements[keydeplacement][key].client_intervention
                      }
                      margin="normal"
                      onChange={e => this.handelechange("nom_technicien",e)}
                    />
                    <TextField
                      required
                      className={classes.textField}
                      label="Delai Intervention"
                      defaultValue={
                        deplacements[keydeplacement][key].delai_intervention
                      }
                      margin="normal"
                      onChange={e => this.handelechange("nom_technicien",e)}
                    />
                    </Paper>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          ))
        )}
        <div dir="rtl">
        <Button className={classes.submitButton}  variant="contained" type="submit"  color="primary">Sauvegarder</Button>
        </div>
         

          </form>
        </Paper>

    </React.Fragment>);
  }
}

export default withStyles(styles)(Technicien);
