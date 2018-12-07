import React, { Component } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import { withStyles } from "@material-ui/core/styles/";
import Technicien from "./components/technicien";
import Superviseur from "./components/Superviseur";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Chef from "./components/Chef";
import Filter from "./components/Filter";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
//enum ,set
const styles = theme => ({
  container: {
    background: "#fff"
  }
});

class App extends Component {
  state = {
    technicien: null,
    superviseur: null,
    chef: null
  };
  // componentDidMount() {
  //   this.fetchSuper();
  //   this.fetchTechnicien();
  //   this.fetchChef();
  // }

  // fetchSuper = async () => {
  //   fetch("https://yagoubi.000webhostapp.com/JSON/v1/super.json")
  //     .then(superviseur => superviseur.json())
  //     .then(superviseur => this.setState({ superviseur }))
  //     .catch(error => console.log("error fetch superviseur :" + error));
  // };

  // fetchTechnicien = async () => {
  //   fetch("https://yagoubi.000webhostapp.com/JSON/v1/technicien.json")
  //     .then(technicien => technicien.json())
  //     .then(technicien => this.setState({ technicien }))
  //     .catch(error => console.log("error fetch technicien :" + error));
  // };
  // fetchChef = async () => {
  //   fetch("http://yagoubi.000webhostapp.com/JSON/v1/chef.json")
  //     .then(chef => chef.json())
  //     .then(chef => this.setState({ chef }))
  //     .catch(error => console.log("error fetch chef :" + error));
  // };

  render() {
    const chef =
      this.state.chef !== null ? (
        <Route
          path="/chef"
          render={props => <Chef {...props} chef={this.state.chef} />}
        />
      ) : (
        <CircularProgress />
      );
    const technicien =
      this.state.technicien !== null ? (
        <Route
          path="/technicien"
          render={props => (
            <Technicien {...props} technicien={this.state.technicien} />
          )}
        />
      ) : (
        <CircularProgress />
      );
    const { classes } = this.props;
    return (
      <div className={classes.container}>
       {/*  <Router>
          <div>
            <NavBar />

            <Switch>
              <Route path="/" component={Superviseur} exact />
              {chef}
              {technicien}
            </Switch>
          </div>
        </Router> */}
        <Filter />
      </div>
    );
  }
}

export default withStyles(styles)(App);
