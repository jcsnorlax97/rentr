import React, { Component } from "react";
import Listing from "../Listing/listing";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Paper} from "@material-ui/core";
// import axios from "axios"; // this is for rest services

import "../../styles/HomeContent.css";

class HomeContent extends Component {

  render() {
    return (
      <div className="homeContent">
        <Paper elevation={3} style = {{
          width: 256,
          height: 256,
          margin: 16
        }}>
          <Listing/>
        </Paper>

        <Paper elevation={3} style = {{
          width: 256,
          height: 256,
          margin: 16
        }}>
          <Listing/>
        </Paper>

        <Paper elevation={3} style = {{
          width: 256,
          height: 256,
          margin: 16
        }}>
          <Listing/>
        </Paper>
      </div>
    )
  }
}

//REDUX
const mapStateToProps = state => {
  return {
    
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(HomeContent);
