import React, { Component } from "react";
import HomeContent from "../components/HomeContent/homeContent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setStatus,
  setLogin_dialog,
  setRegister_dialog,
  setSearchError,
  setSearchValue,
} from "../actions/HomePage";
import {
  setListingArray,
  setPageNum
} from "../actions/ListingDetail";
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
  TextField
} from "@material-ui/core";
import { Person } from '@material-ui/icons';
import moment from "moment";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import CreateListingButton from "../components/CreateListing/CreateListingButton";
import LoginDialogButton from "../components/LoginDialogButton";
import Profile from "../components/Profile/Profile";
import AdvancedSearch from "../components/AdvancedSearch";
import { trackPromise } from "react-promise-tracker";

import {API_ROOT_GET} from "../data/urls"
import axios from "axios";
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
              onClick = {this.handleClickLogo}
              id="logo"
              src={logo}
              alt="Rentr Logo"
            />
            
            <TextField
              variant="outlined"
              margin="dense"
              id="headerSearchField"
              className="headerSearchField"
              type="email"
              value={this.props.searchFieldValue}
              style = {{
                backgroundColor: "white",
                color: "black",
                border: "none",
                borderRadius: 3,
                width: 300,
                marginTop: 4,
                marginBottom: 4, 
                marginRight: 20,
                marginLeft: 30
              }}
              onKeyPress={(e) => {
                if (e.which === 32) { //32 is the space character
                  e.preventDefault()
                }
              }}
              error = {this.props.searchFieldError}
              placeholder = "Enter a keyword"
              onChange={e => {
                if(this.props.searchFieldError){
                  this.props.setSearchError(false)
                }
                this.props.setSearchValue(e.target.value)
              }}
            />
            <AdvancedSearch/>
            
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
      status: false,
      userid: null,
      token: null
    })
    this.resetDialogsStatus()
  }

  resetDialogsStatus = () => {
    this.props.setLogin_dialog(false);
    this.props.setRegister_dialog(false);
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

  handleClickLogo = () =>{
    this.fetchListing()
    this.props.setPageNum(1)
  }

  fetchListing = () =>{
    this.props.setListingArray([])
    trackPromise(
      this.fetchWithDelay()
    , "fetchListingArea")
  }

  fetchWithDelay = () =>{
    const url = String(API_ROOT_GET).concat("listing")
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          axios.get(url)
          .then(response =>{
            this.props.setListingArray(response.data)
          })
        );
      }, 1000)
    });
  
    return promise;
  }
}

//REDUX
const mapStateToProps = state => {
  return {
    status: state.homeContent.status,
    cookies: state.homeContent.cookies,
    searchFieldError: state.homeContent.searchFieldError,
    searchFieldValue: state.homeContent.searchFieldValue,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setStatus,
    setLogin_dialog,
    setRegister_dialog,
    setSearchError,
    setSearchValue,
    setListingArray,
    setPageNum
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
