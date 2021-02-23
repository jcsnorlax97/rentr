import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setTitle,
  setDialogOpen
} from "../../actions/CreateListing";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";

import "../../styles/HomePage.css"

class CreateListingButton extends Component {

  render() {
    return (
      <div
        className="homePage"
      >
        <Button
          className="homePage_Header_Login"
          id="homePage_Header_Login"
          variant="contained"
          onClick={() => {
            this.props.setDialogOpen(true)
          }}
        >
          Add Listing
        </Button>

        <Dialog
          open={this.props.dialogOpen}
          onClose={() => {
            this.resetDialogStatus()
          }}
          style={{
            margin: "auto",
            width: 500
          }}
        >

          <DialogTitle className="homeDialog-title">
            Create a Listing
                <IconButton
              className="homeDialog-title-closeButton"
              onClick={() => {
                this.resetDialogStatus()
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            className="homeDialog-Content"
          >
            <TextField
              autoFocus
              margin="dense"
              className="emailField"
              label="title"
              type="text"
              onChange={this.handleTitle}
            >
              {this.props.loginEmail}
            </TextField>

          </DialogContent>

          <DialogActions
            className="homeDialog-Actions"
          >
            <Button
              className="homeDialog-normalButton"
              onClick={this.handleClickCreate}
            >
              Create
                </Button>
          </DialogActions>

        </Dialog>
        {/* End of login dialog */}

      </div>
    )
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }

  handleTitle = (event) => {
    this.props.setTitle(event.target.value);
  }

  handleClickCreate = () => {
    axios.post()
      .then(response => {

      })
    this.resetDialogStatus();
  }

  handleClickCancel = () => {
    this.resetDialogStatus();
  }

  resetDialogStatus = () => {
    this.props.setDialogOpen(false);
  }

}

//REDUX
const mapStateToProps = state => {
  return {
    title: state.createListingContent.title,
    dialogOpen: state.createListingContent.dialogOpen,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setTitle,
    setDialogOpen,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(CreateListingButton);
