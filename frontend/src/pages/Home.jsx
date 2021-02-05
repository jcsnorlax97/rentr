import React, { Component } from "react";
import HomeContent from "../components/HomeContent/homeContent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { Link } from "react-router-dom";
import logo from "../resources/logo.png";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";

import "../styles/Home.css"


class Home extends Component {
  render() {
    return (
      <div
        className="homePage"
        style = {{
          height: "auto"
        }}
      >
        <AppBar position = "sticky">
          <Toolbar>
          <img
            id="logo" 
            src={logo}
            alt="Logo"
          />
          <Typography
            type="title" color="inherit" style={{ flex: 1 }}
          >
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            style = {{
              marginRight: 10
            }}
          >
            Sign in 
          </Button>
          <Button variant="contained" color="primary">
            Register
          </Button>
          </Toolbar>
        </AppBar>
        <HomeContent/>
      </div>
    )
  }
}

//REDUX
const mapStateToProps = state => {
  return {
    state: state.content,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Home);
