import React, { Component } from "react";
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
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";

import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import { VpnKey } from '@material-ui/icons';

import {DisplayInfo} from "../Util/DisplayWarning"
import { API_ROOT_POST, LOGIN_ADDRESS } from "../data/urls";


import "../styles/HomePage.css";

const loginSuccessMessage = "Welcome home, returning to home page shortly."
const loginFailMessage = "Incorrect email and password combination is entered"
const loginWarningMessage = "This email has not been registered yet"
const registerSuccessMessage = "Your account is registered successfully, you'll be taken back to homePage shortly."
const registerFailMessage = "Account with current email has already been registered"
class LoginDialog extends Component {

  state = {
    menuOpen: false,
    registerMessage: false,
    registerSuccess: false,
    loginSuccess: false,
    loginMessage: false,
    loginError: false
  }

  componentDidMount() {
    this.props.setRegistering(false)
    this.props.setLogging(false)
    this.props.setRegister_dialog(false)
    this.props.setLogin_dialog(false)
  }

  render() {
    return (
      <div
        className="homePage"
      >
        <React.Fragment>
          <Button
            className="homePage_Header_Login"
            id="homePage_Header_Login"
            variant="contained"
            onClick={() => {
              this.props.setLogin_dialog(true)
              this.props.setRegister_dialog(false)
            }}
          >
            Log In
              </Button>

          {this.handleShowLogInDialog()}
          {this.handleShowRegisterDialog()}
        </React.Fragment>
      </div >
    )
  }

  // TRANSPLANT


  handleShowLogInDialog = () => {
    return (
      <Dialog
        disableBackdropClick
        id="loginDialog"
        open={this.props.loginDialogOpen}
        onClose={() => {
          this.resetDialogsStatus()
        }}
        style={{
          margin: "auto",
          width: "500px"
        }}
      >
        <DisplayInfo
          displayMessage = {this.state.loginMessage}
          displaySuccess = {this.state.loginSuccess}
          displayWarning = {this.state.loginError}
          successMessage = {loginSuccessMessage}
          failedMessage = {loginFailMessage}
          WarningMessage = {loginWarningMessage}
          handleCloseMessage = {this.handleCloseLoginSnackBar}
        />
        <DialogTitle className="homeDialog-title">
          Login
          <IconButton
            className="homeDialog-title-closeButton"
            disabled={this.props.logging}
            onClick={() => {
              this.resetDialogsStatus()
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="homeDialog-Content">
          <Formik
            initialValues={{ loginEmail: "", loginPassword: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false)
              this.props.setLogging(true)
              axios({
                method: "post",
                url: LOGIN_ADDRESS,
                data: {
                  "email": values.loginEmail.trim(),
                  "password": values.loginPassword.trim()
                }
              })
                .then(response => {
                  if (response.data
                    && response.data.message
                    && response.data.message === "Login successful.") {
                    // then we're logged in successfully
                    this.setState({
                      loginMessage: true,
                      loginSuccess: true,
                      loginError: false
                    })
                    setTimeout(() => {
                      this.resetDialogsStatus()
                      this.props.setStatus({
                        status: true,
                        token: response.data.token,
                        userid: response.data.userId
                      })
                      this.props.setLogging(false)
                    }, 5000);
                  }
                  else {
                    this.props.setStatus({
                      status: false,
                      token: null,
                      userid: null
                    })
                    this.setState({
                      loginMessage: true,
                      loginSuccess: false,
                      loginError: false
                    })
                    this.props.setLogging(false)
                  }
                })
                .catch(error => {
                  this.props.setStatus({
                    status: false,
                    token: null,
                    userid: null
                  })
                  if (error.response.data === "The login email or password is not valid."){
                    this.setState({
                      loginMessage: true,
                      loginSuccess: false,
                      loginError: false
                    })
                  }
                  else if (error.response.data === "Please check your login info."){
                    this.setState({
                      loginMessage: true,
                      loginSuccess: false,
                      loginError: true
                    })
                  }
                  this.props.setLogging(false)
                })
            }}
            validationSchema={yup.object().shape({
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
                <form onSubmit={handleSubmit}>
                  <div className="homeDialog-textContent">

                    <div className="homeDialog-textFieldIcon"><EmailIcon /></div>
                    <TextField
                      variant="outlined"
                      margin="dense"
                      id="loginEmail"
                      name="loginEmail"
                      className="emailField"
                      label="sample@email.com"
                      type="email"
                      value={values.loginEmail}
                      disabled={this.props.logging}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.loginEmail && Boolean(errors.loginEmail)}
                      helperText={touched.loginEmail && errors.loginEmail}
                    />

                  </div>

                  <div className="homeDialog-textContent">

                    <div className="homeDialog-textFieldIcon"><VpnKey /></div>

                    <TextField
                      variant="outlined"
                      margin="dense"
                      id="loginPassword"
                      name="loginPassword"
                      className="passwordField"
                      label="password"
                      type="password"
                      value={values.loginPassword}
                      disabled={this.props.logging}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.loginPassword && Boolean(errors.loginPassword)}
                      helperText={touched.loginPassword && errors.loginPassword}
                    />

                  </div>

                  <DialogActions className="homeDialog-Actions">
                    <Button
                      className={
                        this.props.logging
                          ? "homeDialog-inProgressButton"
                          : "homeDialog-normalButton"
                      }
                      type="submit"
                      disabled={this.props.logging}
                    >
                      {this.props.logging ? "Logging In" : "Login"}
                    </Button>
                    <div style={{ flex: '1 0 0' }} />
                    <Button
                      onClick={this.handleClickRegister}
                      className={
                        this.props.logging
                          ? "homeDialog-inProgressNewUserButton"
                          : "homeDialog-newUserButton"
                      }
                      disabled={this.props.logging}
                    >
                      <div>
                        Don't have an account?
                        <br />
                        <div
                          style={{
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

  handleShowRegisterDialog = () => {
    return (
      <Dialog
        open={this.props.registerDialogOpen}
        disableBackdropClick
        onClose={() => {
          this.resetDialogsStatus()
        }}
        style={{
          margin: "auto",
          width: "500px"
        }}
      >
        <DisplayInfo
          displayMessage = {this.state.registerMessage}
          displaySuccess = {this.state.registerSuccess}
          displayWarning = {false}
          successMessage = {registerSuccessMessage}
          failedMessage = {registerFailMessage}
          WarningMessage = {""}
          handleCloseMessage = {this.handleCloseRegisterSnackBar}
        />

        <DialogTitle className="homeDialog-title">
          Register
          <IconButton
            className="homeDialog-title-closeButton"
            disabled={this.props.registering}
            onClick={() => {
              this.resetDialogsStatus()
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          className="homeDialog-Content"
        >
          <Formik
            initialValues={{ registerEmail: "", registerPassword: "", registerPassword_confirmed: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              this.props.setRegistering(true)
              console.log(this.props.registering)
              const url = String(API_ROOT_POST).concat("user/registration");
              let content = {
                email: String(values.registerEmail),
                password: String(values.registerPassword)
              }
              axios.post(url, content)
                .then(response => {
                  // If the account is registered successfully
                  if (response.data && response.data.userId) {
                    this.setState({
                      registerSuccess: true,
                      registerMessage: true
                    })
                    setTimeout(() => {
                      this.resetDialogsStatus()
                      this.props.setRegistering(false)
                    }, 5000);
                  }
                  // If the account is registered NOT successfully
                  else {
                    this.setState({
                      registerSuccess: false,
                      registerMessage: true
                    })
                    this.props.setRegistering(false)
                  }
                  this.props.setStatus({
                      status: false,
                      token: null,
                      userid: null
                    })
                })
                // If the account is registered NOT successfully
                .catch(error => {
                  this.props.setStatus({
                      status: false,
                      token: null,
                      userid: null
                    })
                  this.setState({
                    registerMessage: true,
                    registerSuccess: false
                  })
                  this.props.setRegistering(false)
                  console.log(error)
                })
            }}
            validationSchema={yup.object().shape({
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
                  "Passwords do not match", // your error messag
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
                <form onSubmit={handleSubmit}>
                  <div className="homeDialog-textContent">

                    <div className="homeDialog-textFieldIcon"><EmailIcon /></div>
                    <TextField
                      variant="outlined"
                      margin="dense"
                      id="registerEmail"
                      name="registerEmail"
                      className="emailField"
                      label="sample@email.com"
                      type="email"
                      value={values.registerEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.registerEmail && Boolean(errors.registerEmail)}
                      helperText={touched.registerEmail && errors.registerEmail}
                    />

                  </div>

                  <div className="homeDialog-textContent">

                    <div className="homeDialog-textFieldIcon"><VpnKey /></div>
                    <TextField
                      variant="outlined"
                      margin="dense"
                      id="registerPassword"
                      name="registerPassword"
                      className="passwordField"
                      label="password"
                      type="password"
                      value={values.registerPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.registerPassword && Boolean(errors.registerPassword)}
                      helperText={touched.registerPassword && errors.registerPassword}
                    />

                  </div>

                  <div className="homeDialog-textContent">

                    <div className="homeDialog-textFieldIcon"><VpnKey /></div>
                    <TextField
                      variant="outlined"
                      margin="dense"
                      id="registerPassword_confirmed"
                      name="registerPassword_confirmed"
                      className="confirmed_passwordField"
                      label="re-enter password"
                      type="password"
                      value={values.registerPassword_confirmed}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.registerPassword_confirmed && Boolean(errors.registerPassword_confirmed)}
                      helperText={touched.registerPassword_confirmed && errors.registerPassword_confirmed}
                    />

                  </div>



                  <DialogActions
                    className="homeDialog-Actions"
                  >
                    <Button
                      className={
                        this.props.registering
                          ? "homeDialog-inProgressButton"
                          : "homeDialog-normalButton"
                      }
                      type="submit"
                      disabled={this.props.registering}
                    >
                      {this.props.registering ? 'Registering' : 'Register'}
                    </Button>

                    <div style={{ flex: '1 0 0' }} />

                    <Button
                      className={
                        this.props.registering
                          ? "homeDialog-inProgressButton"
                          : "homeDialog-normalButton"
                      }
                      onClick={this.handleClickCancel}
                      disabled={this.props.registering}
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

  handleCloseLoginSnackBar = (event, reason) => {
    if (reason === "clickaway")
      return
    this.setState({
      loginMessage: false
    })
  }

  handleCloseRegisterSnackBar = (event, reason) => {
    if (reason === "clickaway")
      return
    this.setState({
      registerMessage: false
    })
  }
  
  handleClickRegister = () => {
    this.props.setLogin_dialog(false);
    this.props.setRegister_dialog(true);
  }

  handleClickCancel = () => {
    this.resetDialogsStatus();
  }

  resetDialogsStatus = () => {
    this.props.setLogin_dialog(false);
    this.props.setRegister_dialog(false);
    this.setState({
      menuOpen: false,
      registerMessage: false,
      registerSuccess: false,
      loginSuccess: false,
      loginMessage: false,
      loginError: false
    })
  }

} // class LoginDialog


//REDUX
const mapStateToProps = state => {
  return {
    status: state.homeContent.status,
    userEmail: state.homeContent.userEmail,
    logging: state.homeContent.logging,
    registering: state.homeContent.registering,
    loginDialogOpen: state.homeContent.loginDialogOpen,
    registerDialogOpen: state.homeContent.registerDialogOpen,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setStatus,
    setLogging,
    setRegistering,
    setUserEmail,
    setLogin_dialog,
    setRegister_dialog
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(LoginDialog);
