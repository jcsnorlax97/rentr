import React, { Component } from "react";
import HomeContent from "../components/HomeContent/homeContent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setLogin_email,
  setLogin_password,
  setRegister_email,
  setRegister_password,
  set_secondRegister_password,
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
        <AppBar 
          position = "sticky"
          style = {{
            background: "#131921"
          }}
        >
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
            style = {{
              marginRight: 10,
              color: "#0F1111",
              background: "#f0c14b",
              fontWeight: 600
            }}
            onClick = {()=>{
              this.props.setLogin_dialog(true)
              this.props.setRegister_dialog(false)
            }}
          >
            Log In
          </Button>
          
          {/* This is for the login dialog */}
          <Dialog
            open={this.props.loginDialogOpen} 
            onClose={()=>{
              this.props.setLogin_dialog(false)
              this.props.setRegister_dialog(false)
            }}
            aria-labelledby="login-dialog-title"
            style = {{
              margin: "auto",
              width: 500
            }}
          >

            <DialogTitle id="login-dialog-title"> 
              Login
              <IconButton
                style = {{
                  position: "absolute",
                  top: "5px",
                  right: "5px"
                }}
                onClick={()=>{
                  this.props.setLogin_dialog(false)
                  this.props.setRegister_dialog(false)
                }}
              >
                <CloseIcon/>
              </IconButton>
            </DialogTitle>

            <DialogContent
              style = {{
                padding: "0px 20px 30px 20px" // top, left, bottom, right
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                id="emailID"
                label="sample@email.com"
                type="email"
                style = {{
                  minWidth: "150px",
                  width:"80%"
                }}
                onChange = {this.handleLoginEmail}
              >
                {this.props.loginEmail}
              </TextField>
              <TextField
                autoFocus
                margin="dense"
                id="passwordID"
                label="password"
                type="password"
                style = {{
                  minWidth: "150px",
                  width:"80%"
                }}
                onChange = {this.handleLoginPassword}
              >
                {this.props.loginPassword}
              </TextField>
            </DialogContent>

            <DialogActions
              style = {{
                padding: "0px 20px 10px 20px" // top, left, bottom, right
              }}
            >
              <Button
                onClick={this.handleClickLogin}
                style = {{
                  color: "black",
                  background: "#f0c14b",
                  width: "120px",
                  height: "50px",
                  fontWeight: 700,
                  fontSize: 18
                }}
              >
                Login
              </Button>
              <div style={{flex: '1 0 0'}} />
              <Button
                onClick={this.handleClickRegister}
                style = {{
                  color: "black",
                  background: "#f0c14b",
                  width: "200px",
                  height: "50px",
                  fontSize: 12
                }}
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
              this.props.setLogin_dialog(false)
              this.props.setRegister_dialog(false)
            }}
            aria-labelledby="register-dialog-title"
            style = {{
              margin: "auto",
              width: 500
            }}
          >

            <DialogTitle id="register-dialog-title"> 
              Register
              <IconButton
                style = {{
                  position: "absolute",
                  top: "5px",
                  right: "5px"
                }}
                onClick={()=>{
                  this.props.setLogin_dialog(false)
                  this.props.setRegister_dialog(false)
                }}
              >
                <CloseIcon/>
              </IconButton>
            </DialogTitle>

            <DialogContent
              style = {{
                padding: "0px 20px 30px 20px" // top, left, bottom, right
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                id="emailID"
                label="sample@email.com"
                type="email"
                style = {{
                  minWidth: "150px",
                  width:"80%"
                }}
                onChange = {this.handleRegisterEmail}
              >
                {this.props.registerEmail}
              </TextField>
              <TextField
                autoFocus
                margin="dense"
                id="register_passwordID"
                label="password"
                type="password"
                style = {{
                  minWidth: "150px",
                  width:"80%"
                }}
                onChange = {this.handleRegisterPassword}
              >
                {this.props.registerPassword}
              </TextField>
              <TextField
                autoFocus
                margin="dense"
                id="second_register_passwordID"
                label="re-enter password"
                type="password"
                style = {{
                  minWidth: "150px",
                  width:"80%"
                }}
                onChange = {this.handleSecondRegisterPassword}
              >
                {this.props.registerPassword_second}
              </TextField>
            </DialogContent>

            <DialogActions
              style = {{
                padding: "0px 20px 10px 20px" // top, left, bottom, right
              }}
            >
              <Button
                onClick={this.handleClickSendRegister}
                style = {{
                  color: "black",
                  background: "#f0c14b",
                  width: "120px",
                  height: "50px",
                  fontWeight: 700,
                  fontSize: 18
                }}
              >
                Register
              </Button>

              <div style={{flex: '1 0 0'}} />

              <Button
                onClick={this.handleClickCancel}
                style = {{
                  color: "black",
                  background: "#f0c14b",
                  width: "200px",
                  height: "50px",
                  fontWeight: 700,
                  fontSize: 18
                }}
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
    this.props.set_secondRegister_password(event.target.value);
  }

  handleClickSendRegister = () =>{
    axios.post()
    .then(response =>{

    })
    this.props.setLogin_dialog(false);
    this.props.setRegister_dialog(false);
  }

  handleClickCancel = () => {
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
    set_secondRegister_password,
    setRegister_email,
    setRegister_password,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Home);
