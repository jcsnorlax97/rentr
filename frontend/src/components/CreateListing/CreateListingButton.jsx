import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setTitle,
  setDescription,
  setNumberOfBedrooms,
  setNumberOfBathrooms,
  setPrice,
  setLaundry,
  setPetsAllowed,
  setParking,
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
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import ImageUploader from "../ImageUpload/ImageUploader";

import "../../styles/HomePage.css"

const YesNo = [
  {
    value: true,
    label: 'yes'
  },
  {
    value: false,
    label: 'no'
  }
]

const numberDropdownOptions = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: '>5',
    label: '>5'
  }
]


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
          maxWidth='none'
          contentStyle={{
            width: '80%',
            maxWidth: 'none'
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
            <div className = "ImageUploadContainer">
              <ImageUploader/>
            </div>
            <TextField
              label="Title"
              autoFocus
              required
              fullWidth
              className="emailField"
              type="text"
              inputProps={{ maxLength: 100 }}
              onChange={this.handleTitle}
            >
              {this.props.title}
            </TextField>

            <TextField
              label="Description"
              id="standard-multiline-static"
              multiline
              required
              fullWidth
              rows={8}
              margin="dense"
              className="emailField"
              type="text"
              inputProps={{ maxLength: 5000 }}
              onChange={this.handleDescription}
            >
              {this.props.description}
            </TextField>
            <TextField
              label="Bedrooms"
              id="outlined-select-full-width"
              required
              variant="outlined"
              margin="dense"
              select
              fullWidth
              value={this.props.numberOfBedrooms}
              inputProps={{ color: 'green' }}
              onChange={this.handleNumberOfBedrooms}
            >
              {numberDropdownOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              id="outlined-select"
              variant="outlined"
              margin="dense"
              select
              fullWidth
              label="Bathrooms"
              value={this.props.numberOfBathrooms}

              onChange={this.handleNumberOfBathrooms}
            >
              {numberDropdownOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>


            {/** new stuff */}
            <TextField
              label="Price"
              required
              fullWidth
              className="emailField"
              type="text"
              inputProps={{ maxLength: 100 }}
              onChange={this.handlePrice}
            >
              {this.props.title}
            </TextField>

            <TextField
              label="Laundry Room"
              required
              id="outlined-select"
              variant="outlined"
              margin="dense"
              select
              fullWidth
              value={this.props.laundry}

              onChange={this.handleLaundry}
            >
              {YesNo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Pets allowed"
              required
              id="outlined-select"
              variant="outlined"
              margin="dense"
              select
              fullWidth
              value={this.props.petsAllowed}

              onChange={this.handlePetsAllowed}
            >
              {YesNo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Parking"
              required
              id="outlined-select"
              variant="outlined"
              margin="dense"
              select
              fullWidth
              value={this.props.parking}

              onChange={this.handleParking}
            >
              {YesNo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
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

      </div >
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

  handleDescription = (event) => {
    this.props.setDescription(event.target.value);
  }

  handleNumberOfBedrooms = (event) => {
    this.props.setNumberOfBedrooms(event.target.value);
  }

  handleNumberOfBathrooms = (event) => {
    this.props.setNumberOfBathrooms(event.target.value);
  }

  handlePrice = (event) => {
    this.props.setPrice(event.target.value);
  }

  handleLaundry = (event) => {
    this.props.setLaundry(event.target.value);
  }

  handlePetsAllowed = (event) => {
    this.props.setPetsAllowed(event.target.value);
  }

  handleParking = (event) => {
    this.props.setParking(event.target.value);
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
    this.props.setDescription("");
    this.props.setNumberOfBedrooms("");
    this.props.setNumberOfBathrooms("");
    this.props.setPrice("");
    this.props.setLaundry("");
    this.props.setPetsAllowed("");
    this.props.setParking("");
  }

}

//REDUX
const mapStateToProps = state => {
  return {
    title: state.createListingContent.title,
    description: state.createListingContent.title,
    numberOfBedrooms: state.createListingContent.numberOfBedrooms,
    numberOfBathrooms: state.createListingContent.numberOfBathrooms,
    price: state.createListingContent.price,
    laundry: state.createListingContent.laundry,
    petsAllowed: state.createListingContent.petsAllowed,
    parking: state.createListingContent.parking,
    dialogOpen: state.createListingContent.dialogOpen,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setTitle,
    setDescription,
    setNumberOfBedrooms,
    setNumberOfBathrooms,
    setPrice,
    setLaundry,
    setPetsAllowed,
    setParking,
    setDialogOpen
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(CreateListingButton);
