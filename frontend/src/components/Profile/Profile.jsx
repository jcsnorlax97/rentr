import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setPersonalDialogStatus,
  setPersonalListingArray
} from "../../actions/Profile";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Snackbar,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from "axios";
import {API_ROOT_POST, API_ROOT_GET} from "../../data/urls";

import "../../styles/HomePage.css"
import "../../styles/Profile.css"



class Profile extends Component {

  componentDidMount (){
    this.resetDialogStatus()
  }

  componentWillUnmount(){
    this.resetDialogStatus()
  }

  render(){
    return(
      <div className = "profileIcon-dialog">
        <MenuItem onClick = {()=>{
          this.props.setPersonalDialogStatus(true)
        }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        <Dialog
          open = {this.props.dialogStatus}
          onClose = {this.resetDialogStatus}
          maxWidth = "lg"
        >
          <DialogTitle className="profile-title">
            My Listings
            <IconButton
              className="profile-title-closeButton"
              onClick={this.resetDialogStatus}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Button>
              Click
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  fetchListings = () =>{
    axios.get()
    .then(response=>{
      
    })
  }

  resetDialogStatus = () =>{
    this.props.setPersonalDialogStatus(false)
    this.props.setPersonalListingArray([])
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
    setPersonalDialogStatus,
    setPersonalListingArray
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
