import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setDialogStatus,
  setListingArray
} from "../../actions/Profile";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import {API_ROOT_POST, API_ROOT_GET} from "../../data/urls";

import "../../styles/HomePage.css"
import "../../styles/Profile.css"



class Profile extends Component {
  render(){
    return(
      <Dialog>
      </Dialog>
    )
  }
}

//REDUX
const mapStateToProps = state => {
  return {
    dialogStatus: state.profile.dialogStatus,
    profileListingArray: state.profile.profileListingArray,
    cookies: state.homeContent.cookies,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setDialogStatus,
    setListingArray
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
