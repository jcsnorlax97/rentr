import React, { Component } from "react";
import HomeContent from "../components/HomeContent/homeContent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setStatus,
  setToken
} from "../actions/HomePage";
import logo from "../resources/logo.png";
import { AppBar, Toolbar, Button, Typography, Paper, ListItemText } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import { VpnKey, Person } from '@material-ui/icons';
import axios from "axios";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import Popover from '@material-ui/core/Popover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { API_ROOT_POST, LOGIN_ADDRESS } from "../data/urls";
import CreateListingButton from "../components/CreateListing/CreateListingButton";

import "../styles/HomePage.css"
import LoginDialogButton from "../components/LoginDialogButton";

class HomePage extends Component {
  state = {
    anchorEl: null,
  }

  render() {
    return (
      <div
        className="homePage"
      >
        <AppBar
          id="homePage_Header"
          position="sticky"
        >
          <Toolbar>

            {/* this is our rentr logo */}
            <img
              id="logo"
              src={logo}
              alt="Rentr Logo"
            />

            {/* this is used to add the space between the logo and sign in button */}
            <Typography type="title" color="inherit" style={{flex: 1 }}/>
            {!this.props.status
              ?
              <LoginDialogButton />
              :
              this.handleShowLoggedIn()
            }
          </Toolbar>

        </AppBar>
        <HomeContent />
      </div>
    )
  }


  handleShowLoggedIn = () => {
    const open = Boolean(this.state.anchorEl);
    return (
      <React.Fragment>
        <CreateListingButton />
        <Button
          onClick={(event) => this.handleOpenPopover(event)}
          style={{
            color: "white"
          }}
        >
          <Person
            fontSize="large"
            style={{
              paddingRight: 10
            }}
          />
          {this.handleGreeting()}
        </Button>

        <Popover
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <ClickAwayListener onClickAway={this.handleClosePopover}>
            <Paper>
              <MenuList>
                {/* This is for the logout function */}
                <MenuItem onClick={this.handleLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Log Out</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </ClickAwayListener>
        </Popover>
      </React.Fragment>
    )
  }


  handleLogout = () => {
    this.setState({
      anchorEl: null
    })
    this.props.setStatus(false)
    this.props.setToken("")
  }

  handleOpenPopover = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClosePopover = () => {
    this.setState({
      anchorEl: null
    })
  }

  handleGreeting = () => {
    let currMoment = new moment().format("HH");

    const afternoon = 12;
    const evening = 18;

    return (currMoment >= evening) ? "Good evening"
      : (currMoment >= afternoon) ? "Good afternoon" 
      : "Good morning";
  }

}

//REDUX
const mapStateToProps = state => {
  return {
    status: state.homeContent.status,
    token: state.homeContent.token
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setStatus,
    setToken
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
