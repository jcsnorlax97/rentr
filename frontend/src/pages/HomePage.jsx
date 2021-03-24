import React, { Component } from "react";
import HomeContent from "../components/HomeContent/homeContent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setStatus,
  setLogging,
  setRegistering,
  setUserEmail,
  setLogin_dialog,
  setRegister_dialog
} from "../actions/HomePage";
import {
  setPersonalDialogStatus
} from "../actions/Profile";
import logo from "../resources/logo.png";
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Paper, 
  ListItemText,
  Popover,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  Box
} from "@material-ui/core";
import { Person } from '@material-ui/icons';
import moment from "moment";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import CreateListingButton from "../components/CreateListing/CreateListingButton";
import LoginDialogButton from "../components/LoginDialogButton";
import Profile from "../components/Profile/Profile"

import "../styles/HomePage.css"


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
            <Typography
              type="title"
              color="inherit"
              style={{
                flex: 1
              }}
            />
            {!this.props.cookies.get("status")
              ?
              <LoginDialogButton />
              :
              this.handleShowLoggedIn()
            }
          </Toolbar>

        </AppBar>
        <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
          <Box border={1} m={1} style={{width:'50%'}}>
            <HomeContent />
          </Box>
          <Box border={1} m={1} style={{width: '50%'}}>
            Stuff here!
          </Box>
        </Box>
        
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
                <Profile/> 

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
    this.props.setStatus({
      status: false
    })
    this.resetDialogsStatus()
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
    cookies: state.homeContent.cookies,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setStatus,
    setLogging,
    setRegistering,
    setUserEmail,
    setLogin_dialog,
    setRegister_dialog,
    setPersonalDialogStatus
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
