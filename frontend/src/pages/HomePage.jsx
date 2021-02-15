import React, { Component } from "react";
import HomeContent from "../components/HomeContent/homeContent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setLogin_email,
  setLogin_password,
  setRegister_email,
  setRegister_password,
  setRegister_confirmedPassword,
  setLogin_dialog,
  setRegister_dialog,
} from "../actions/Home";
import logo from "../resources/logo.png";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";

import "../styles/HomePage.css"

class HomePage extends Component {

  render() {
    return (
      <div
        className="homePage"
      >
        <AppBar
          id = "homePage_Header"
          position = "sticky"
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

            {/* This is the login button
              click on it will show login dialog, instead of register dialog 
            */}
            <Button
              className = "homePage_Header_Login"
              id = "homePage_Header_Login"
              variant="contained"
              onClick = {()=>{
                this.props.setLogin_dialog(true)
                this.props.setRegister_dialog(false)
              }}
            >
              Log In
            </Button>
            
            {/* This is for the login dialog */}
            <Dialog
              id = "loginDialog"
              open={this.props.loginDialogOpen} 
              onClose={()=>{
                this.resetDialogsStatus()
              }}
              style = {{
                margin: "auto",
                width: 500
              }}
            >

              <DialogTitle className="homeDialog-title"> 
                Login
                <IconButton
                  className = "homeDialog-title-closeButton"
                  onClick={()=>{
                    this.resetDialogsStatus()
                  }}
                >
                  <CloseIcon/>
                </IconButton>
              </DialogTitle>

              <DialogContent
                className = "homeDialog-Content"
              >
                <TextField
                  autoFocus
                  margin="dense"
                  className = "emailField"
                  label="sample@email.com"
                  type="email"
                  onChange = {this.handleLoginEmail}
                >
                  {this.props.loginEmail}
                </TextField>

                <TextField
                  autoFocus
                  margin="dense"
                  className = "passwordField"
                  label="password"
                  type="password"
                  onChange = {this.handleLoginPassword}
                >
                  {this.props.loginPassword}
                </TextField>
              </DialogContent>

              <DialogActions
                className = "homeDialog-Actions"
              >
                <Button
                  className = "homeDialog-normalButton"
                  onClick={this.handleClickLogin}
                >
                  Login
                </Button>
                <div style={{flex: '1 0 0'}} />
                <Button
                  onClick={this.handleClickRegister}
                  className = "homeDialog-newUserButton"
                >
                  <div>
                    Don't have an account?
                    <br/>
                    <div
                      style = {{
                        fontSize: 16,
                        fontWeight: 600
                      }}
                    >
                      Register!
                    </div>
                  </div>
                </Button>
                {/* <br/> */}
                {/* <button
                  onClick = {this.handleClick}
                >
                  click
                </button> */}
              </DialogActions>

            </Dialog>
            {/* End of login dialog */}
            







            {/* This is for the Register dialog */}
            <Dialog 
              open={this.props.registerDialogOpen} 
              onClose={()=>{
                this.resetDialogsStatus()
              }}
              style = {{
                margin: "auto",
                width: 500
              }}
            >

              <DialogTitle className="homeDialog-title"> 
                Register
                <IconButton
                  className = "homeDialog-title-closeButton"
                  onClick={()=>{
                    this.resetDialogsStatus()
                  }}
                >
                  <CloseIcon/>
                </IconButton>
              </DialogTitle>

              <DialogContent
                className = "homeDialog-Content"
              >
                <TextField
                  autoFocus
                  margin="dense"
                  className = "emailField"
                  label="sample@email.com"
                  type="email"
                  onChange = {this.handleRegisterEmail}
                >
                  {this.props.registerEmail}
                </TextField>

                <TextField
                  autoFocus
                  margin="dense"
                  className = "passwordField"
                  label="password"
                  type="password"
                  onChange = {this.handleRegisterPassword}
                >
                  {this.props.registerPassword}
                </TextField>

                <TextField
                  autoFocus
                  margin="dense"
                  className = "confirmed_passwordField"
                  label="re-enter password"
                  type="password"
                  onChange = {this.handleSecondRegisterPassword}
                >
                  {this.props.registerPassword_second}
                </TextField>
              </DialogContent>

              <DialogActions
                className = "homeDialog-Actions"
              >
                <Button
                  className = "homeDialog-normalButton"
                  onClick={this.handleClickSendRegister}
                >
                  Register
                </Button>

                <div style={{flex: '1 0 0'}} />

                <Button
                  className = "homeDialog-normalButton"
                  onClick={this.handleClickCancel}
                >
                  cancel
                </Button>

              </DialogActions>

            </Dialog>

          </Toolbar>
        </AppBar>
        <HomeContent/>
      </div>
    )
  }

  // handleClick = () =>{
  //   console.log("email is now:" + this.props.loginEmail)
  //   console.log("password is now:" + this.props.loginPassword)
  // }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }

  handleClickLogin = () => {
    axios.post()
    .then(response =>{

    })
    this.props.setLogin_dialog(false); // this should be moved into then once we have rest service ready
  }

  handleClickRegister = () =>{ 
    this.props.setLogin_dialog(false);
    this.props.setRegister_dialog(true);
  }

  handleLoginEmail = (event) => {
    this.props.setLogin_email(event.target.value);
  }

  handleLoginPassword = (event) => {
    this.props.setLogin_password(event.target.value);
  }

  handleRegisterEmail = (event) => {
    this.props.setRegister_email(event.target.value);
  }

  handleRegisterPassword = (event) => {
    this.props.setRegister_password(event.target.value);
  }

  handleSecondRegisterPassword = (event) =>{
    this.props.setRegister_confirmedPassword(event.target.value);
  }

  handleClickSendRegister = () =>{
    axios.post()
    .then(response =>{

    })
    this.resetDialogsStatus();
  }

  handleClickCancel = () => {
    this.resetDialogsStatus();
  }

  resetDialogsStatus = () => {
    this.props.setLogin_dialog(false);
    this.props.setRegister_dialog(false);
  }

}

//REDUX
const mapStateToProps = state => {
  return {
    loginEmail: state.homeContent.loginEmail,
    loginPassword: state.homeContent.loginPassword,
    registerEmail: state.homeContent.registerEmail,
    registerPassword: state.homeContent.registerPassword,
    registerPassword_second: state.homeContent.registerPassword_second,
    loginDialogOpen: state.homeContent.loginDialogOpen,
    registerDialogOpen: state.homeContent.registerDialogOpen,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setLogin_email,
    setLogin_password,
    setLogin_dialog,
    setRegister_dialog,
    setRegister_confirmedPassword,
    setRegister_email,
    setRegister_password,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
