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
  setRegister_dialog,
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
import {VpnKey, Person} from '@material-ui/icons';
// import axios from "axios";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import Popover from '@material-ui/core/Popover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import "../styles/HomePage.css"

class HomePage extends Component {
  state = {
    anchorEl: null,
    menuOpen: false
  }

  componentWillUnmount(){
    this.props.setStatus(false);
  }

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
            
            {!this.props.status
              ?
              (
                <React.Fragment>
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
                
                  {this.handleShowLogInDialog()}
                  {this.handleShowRegisterDialog()}
                </React.Fragment>
              )
              :
                this.handleShowLoggedIn()
            }
          </Toolbar>
        </AppBar>
        <HomeContent/>
      </div>
    )
  }

  handleShowLogInDialog = () =>{
    return (
      <Dialog
        id = "loginDialog"
        open={this.props.loginDialogOpen} 
        onClose={()=>{
          this.resetDialogsStatus()
        }}
        style = {{
          margin: "auto",
          width: "500px"
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

        <DialogContent className = "homeDialog-Content">
          <Formik
            initialValues = {{loginEmail: "", loginPassword: ""}}
            onSubmit = { (values, {setSubmitting}) =>{
              setSubmitting(false)
              this.props.setLogging(true)
              if (values.loginEmail === "test@email.com" && values.loginPassword === "123"){
                this.props.setStatus(true)
              }
              else{
                // axios({
                //   method: "post",
                //   url: this.props.authenticateURL,
                //   data: {
                //     "auth": {
                //       "username": values.loginEmail,
                //       "password": values.loginPassword
                //     }
                //   }
                // })
                // .then(response =>{
                //   if (response.data.status === 200){
                //     // then it succeeded
                //     this.props.setLogin_dialog(false);
                //     this.props.setStatus(true)
                //   }
                //   else{
                //     // other status code stands login has failed
                //   }
                // })
                // .catch(error =>{
                //   // failed, with exception
                // })
              }
            }}
            validationSchema = {yup.object().shape({
              loginEmail: yup
                .string('Enter your email')
                .email('Enter a valid email')
                .required('Email is required'),
              loginPassword: yup
                .string('Enter your password')
                .required('Password is required'),
            })}
          >
            {props => {
              const {
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <form onSubmit = {handleSubmit}>
                  <div className = "homeDialog-textContent">

                    <div className = "homeDialog-textFieldIcon"><EmailIcon/></div>
                    <TextField
                      variant = "outlined"
                      margin="dense"
                      id = "loginEmail"
                      name = "loginEmail"
                      className = "emailField"
                      label="sample@email.com"
                      type="email"
                      value = {values.loginEmail}
                      onChange = {handleChange}
                      onBlur={handleBlur}
                      error = {touched.loginEmail && Boolean(errors.loginEmail)}
                      helperText = {touched.loginEmail && errors.loginEmail}
                    />

                  </div>

                  <div className = "homeDialog-textContent">

                    <div className = "homeDialog-textFieldIcon"><VpnKey/></div>

                    <TextField
                      variant = "outlined"
                      margin="dense"
                      id = "loginPassword"
                      name = "loginPassword"
                      className = "passwordField"
                      label="password"
                      type="password"
                      value = {values.loginPassword}
                      onChange = {handleChange}
                      onBlur={handleBlur}
                      error = {touched.loginPassword && Boolean(errors.loginPassword)}
                      helperText = {touched.loginPassword && errors.loginPassword}
                    />
                
                  </div>

                  <DialogActions className = "homeDialog-Actions">
                    <Button
                      className = "homeDialog-normalButton"
                      // onClick={this.handleClickLogin}
                      type="submit"
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
                  </DialogActions>

                </form>
              )
            }}
          </Formik>
        </DialogContent>

      </Dialog>
    )
  }

  handleShowRegisterDialog = () =>{
    return (
      <Dialog 
        open={this.props.registerDialogOpen} 
        onClose={()=>{
          this.resetDialogsStatus()
        }}
        style = {{
          margin: "auto",
          width: "500px"
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
          <Formik
            initialValues = {{registerEmail: "", registerPassword: "", registerPassword_confirmed: ""}}
            onSubmit = { (values, {setSubmitting}) =>{
              setSubmitting(false)
              this.props.setRegistering(true)
              // axios({
              //   method: "post",
              //   url: this.props.authenticateURL,
              //   data: {
              //     "auth": {
              //       "username": values.registerEmail,
              //       "password": values.registerPassword
              //     }
              //   }
              // })
              // .then(response =>{
              //   if (response.data.status === 200){
              //     // then it succeeded
              //     this.props.setRegister_dialog(false);
              //     this.props.setStatus(true)
              //   }
              //   else{
              //     // other status code stands login has failed
              //   }
              // })
              // .catch(error =>{
              //   // failed, with exception
              // })
            }}
            validationSchema = {yup.object().shape({
              registerEmail: yup
                .string('Enter your email')
                .email('Enter a valid email')
                .required('Email is required'),
              registerPassword: yup
                .string('Enter your password')
                .required('Password is required'),
              registerPassword_confirmed: yup
                .string('Enter your password')
                .required('Password is required')
                .test(
                  "match",
                  "Passwords do not match", // your error message
                  function () {
                    return this.parent.registerPassword === this.parent.registerPassword_confirmed;
                  }
                )
            })}
          >
            {props => {
              const {
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <form onSubmit = {handleSubmit}>
                  <div className = "homeDialog-textContent">

                    <div className = "homeDialog-textFieldIcon"><EmailIcon/></div>
                    <TextField
                      variant = "outlined"
                      margin="dense"
                      id = "registerEmail"
                      name = "registerEmail"
                      className = "emailField"
                      label="sample@email.com"
                      type="email"
                      value = {values.registerEmail}
                      onChange = {handleChange}
                      onBlur={handleBlur}
                      error = {touched.registerEmail && Boolean(errors.registerEmail)}
                      helperText = {touched.registerEmail && errors.registerEmail}
                    />

                  </div>

                  <div className = "homeDialog-textContent">

                    <div className = "homeDialog-textFieldIcon"><VpnKey/></div>
                    <TextField
                      variant = "outlined"
                      margin="dense"
                      id = "registerPassword"
                      name = "registerPassword"
                      className = "passwordField"
                      label="password"
                      type="password"
                      value = {values.registerPassword}
                      onChange = {handleChange}
                      onBlur={handleBlur}
                      error = {touched.registerPassword && Boolean(errors.registerPassword)}
                      helperText = {touched.registerPassword && errors.registerPassword}
                    />

                  </div>

                  <div className = "homeDialog-textContent">

                    <div className = "homeDialog-textFieldIcon"><VpnKey/></div>
                    <TextField
                      variant = "outlined"
                      margin="dense"
                      id = "registerPassword_confirmed"
                      name = "registerPassword_confirmed"
                      className = "confirmed_passwordField"
                      label="re-enter password"
                      type="password"
                      value = {values.registerPassword_confirmed}
                      onChange = {handleChange}
                      onBlur={handleBlur}
                      error = {touched.registerPassword_confirmed && Boolean(errors.registerPassword_confirmed)}
                      helperText = {touched.registerPassword_confirmed && errors.registerPassword_confirmed}
                    />

                  </div>



                  <DialogActions
                    className = "homeDialog-Actions"
                  >
                    <Button
                      className = "homeDialog-normalButton"
                      type="submit"
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
                </form>
              )
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    )
  }

  handleShowLoggedIn = () =>{
    const open = Boolean(this.state.anchorEl);
    return (
      <React.Fragment>
        <Button
          onClick = {(event)=> this.handleOpenPopover(event)}
          style = {{
            color: "white"
          }} 
        >
          <Person
            fontSize = "large"
            style = {{
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
                <MenuItem onClick = {this.handleLogout}>
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

  handleLogout = () =>{
    this.setState({
      anchorEl: null
    })
    this.props.setStatus(false)
    this.resetDialogsStatus()
  }

  handleOpenPopover = (event) =>{
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClosePopover = () =>{
    this.setState({
      anchorEl: null
    })
  }

  handleGreeting = () => {
    let currMoment = new moment().format("HH");

    const afternoon = 12;
    const evening = 18;

    let greeting = "";
    
    if (currMoment >= afternoon && currMoment <= evening){
      greeting = "Good afternoon"
    }
    else if (currMoment >= evening){
      greeting = "Good evening"
    }
    else{
      greeting = "Good morning"
    }
    return greeting
  }

  handleClickRegister = () =>{ 
    this.props.setLogin_dialog(false);
    this.props.setRegister_dialog(true);
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
    userEmail: state.homeContent.userEmail,
    logging: state.homeContent.logging,
    registering: state.homeContent.registering,
    loginDialogOpen: state.homeContent.loginDialogOpen,
    registerDialogOpen: state.homeContent.registerDialogOpen,
    status: state.homeContent.status,
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
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
