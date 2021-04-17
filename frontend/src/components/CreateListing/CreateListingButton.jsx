import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  setDialogOpen,
  setImages,
  setCreatingListing
} from "../../actions/CreateListing";
import {
  setListingArray
} from "../../actions/ListingDetail";
import { 
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import {DisplayInfo} from "../../Util/DisplayWarning"

import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import ImageUploader from "../ImageUpload/ImageUploader";
import {API_ROOT_POST, API_ROOT_GET} from "../../data/urls";
import {dropDownCities} from "../../data/dropdownData"

import "../../styles/HomePage.css"
import "../../styles/CreateListing.css"

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
  }
]
const deleteSuccessMessage = "Your listing is created successfully, you'll be taken back to home page shortly"
const deleteFailMessage = "Listing creation failed, you might need to re-login"

class CreateListingButton extends Component {

  state = {
    postListingSuccess: false,
    postListingMessage: false,
  }

  fetchListing = () =>{
    const url = String(API_ROOT_GET).concat("listing")
    axios.get(url)
    .then(response =>{
      this.props.setListingArray(response.data)
    })
  }

  componentDidMount (){
    this.resetDialogStatus()
  }

  componentWillUnmount (){
    this.resetDialogStatus()
  }

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
          maxWidth = "lg"
        > 
        {/* This shows the infomation about post a listing, whether it is successful or not. */}
          <DisplayInfo
            displayMessage = {this.state.postListingMessage}
            displaySuccess = {this.state.postListingSuccess}
            displayWarning = {false}
            successMessage = {deleteSuccessMessage}
            failedMessage = {deleteFailMessage}
            WarningMessage = {""}
            handleCloseMessage = {this.handleCloseCreateListing}
          />
          {/* This is the title area for creating a listing */}
          <DialogTitle className="createListing-title">
            Create a Listing
            {/* The "X", cancel button on the top right*/}
            <IconButton
              disabled={this.props.creatingListing}
              className="createListing-title-closeButton"
              onClick={() => {
                this.resetDialogStatus()
              }}
            >
              {/* The actual icon */}
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* The content of the dialog */}
          <DialogContent
            className="homeDialog-Content"
          >
            {/* This is the image uploader, which is not included in formik */}
            <ImageUploader 
              value = {this.props.images}
              disabled = {this.props.creatingListing}
              setImages = {this.props.setImages}
            />

            {/* This is the formik, which includes all other information of the listing, 
              such as title, description, price, number of bathrooms etc.
              It is also responsible for validating those fields
            */}
            <Formik
              initialValues={{
                title: "", 
                description: "",
                num_bedroom: "",
                num_bathroom: "",
                price: "",
                is_laundry_available: false,
                is_pet_allowed: false,
                is_parking_available: false,
                city: ""
              }}
              // On submit is responsible for the post request, defines what happens 
              // when doing the post request
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                this.props.setCreatingListing(true)

                let imageCollection = [];
                if (this.props.images && this.props.images.length !== 0){
                  for (let i = 0; i < this.props.images.length; i++){
                    imageCollection.push(this.props.images[i].data_url)
                  }
                }
                // url, body and config of the post request
                let url = API_ROOT_POST.concat("listing")
                let body = {
                  images: imageCollection,
                  userid: this.props.cookies.get("userid"),
                  title: String(values.title),
                  description: String(values.description),
                  num_bedroom: String(values.num_bedroom),
                  num_bathroom: String(values.num_bathroom),
                  price: String(values.price),
                  is_laundry_available: Boolean(values.is_laundry_available),
                  is_pet_allowed: Boolean(values.is_pet_allowed),
                  is_parking_available: Boolean(values.is_parking_available),
                  city: String(values.city),
                  is_available:true,
                }
                const config = {
                  headers: { Authorization: `Bearer ${this.props.cookies.get("status")}` }
                };
                axios.post(url, body, config)
                .then(response => {
                  // If the account is registered successfully
                  if (response.data 
                    && response.data.message === "Listing has been added successfully!"
                    && response.data.listingId) {
                    this.setState({
                      postListingMessage: true,
                      postListingSuccess: true,
                    })
                    this.fetchListing()
                    setTimeout(() => {
                      this.resetDialogStatus()
                      this.props.setDialogOpen(false)
                      this.props.setCreatingListing(false)
                    }, 5000);
                  }
                  // If the account is registered NOT successfully
                  else {
                    this.setState({
                      postListingMessage: true,
                      postListingSuccess: false,
                    })
                    this.props.setCreatingListing(false)
                  }
                })
                // If the account is registered NOT successfully
                .catch(error => {
                  this.setState({
                    postListingMessage: true,
                    postListingSuccess: false,
                  })
                  this.props.setCreatingListing(false)
                  console.log(error)
                })
              }}

              // the validation scheme of the formik
              // defines how those field are checked before a user is able to create 
              // a listing
              validationSchema={yup.object().shape({
                title: yup
                  .string('Enter your listing title')
                  .required('Title is required'),
                description: yup
                  .string('Enter your description')
                  .required('Description is required'),
                num_bedroom: yup
                  .string("Select number of bedrooms")
                  .required('Number of bedrooms is required'),
                num_bathroom: yup
                  .string("Select number of bathrooms")
                  .required('Number of bathrooms is required'),
                price: yup
                  .string("Enter price")
                  .required('Price info is required'),
                is_laundry_available: yup
                  .string("Select if laundry room is available")
                  .required('Laundry info is required'),
                is_pet_allowed: yup
                  .string("Select if pet is allowed")
                  .required('Pet info is required'),
                is_parking_available: yup
                  .string("Select is parking is available")
                  .required('Parking info is required'),
                city: yup
                  .string("Select location of the listing")
                  .required('Location info is required'),
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
                return(
                  <form onSubmit={handleSubmit}>
                    {/* textfield, title of the listing, limit of 100 chars*/}
                    <div className="homeDialog-textContent">
                      <TextField
                        disabled={this.props.creatingListing}
                        label="Title"
                        id="title"
                        name="title"
                        fullWidth
                        className="emailField"
                        type="text"
                        inputProps={{ maxLength: 100 }}
                        value = {values.title}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    </div>

                    <div className="homeDialog-textContent">
                      {/* textfield, description of the listing, limit of 5000 chars */}
                      <TextField
                        disabled={this.props.creatingListing}
                        label="Description"
                        id="description"
                        name="description"
                        multiline
                        fullWidth
                        rows={8}
                        margin="dense"
                        className="emailField"
                        type="text"
                        inputProps={{ maxLength: 5000 }}
                        value = {values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                      />
                    </div>

                    {/* textfield, number of bedrooms of the listing, from 1-5*/}
                    <TextField
                      disabled={this.props.creatingListing}
                      label="Bedrooms"
                      id="num_bedroom"
                      name="num_bedroom"
                      variant="outlined"
                      margin="dense"
                      select
                      style = {{width: 150, marginRight: 30}}
                      inputProps={{ color: 'green' }}
                      value = {values.num_bedroom}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.num_bedroom && Boolean(errors.num_bedroom)}
                      helperText={touched.num_bedroom && errors.num_bedroom}
                    >
                      {numberDropdownOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    
                    {/* selection, number of bathrooms of the listing from 1-5 */}
                    <TextField
                      disabled={this.props.creatingListing}
                      id="num_bathroom"
                      name="num_bathroom"
                      variant="outlined"
                      margin="dense"
                      select
                      style = {{width: 150, marginRight: 30}}
                      label="Bathrooms"
                      value = {values.num_bathroom}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.num_bathroom && Boolean(errors.num_bathroom)}
                      helperText={touched.num_bathroom && errors.num_bathroom}
                    >
                      {numberDropdownOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    
                    {/* selection, city of the listing, currently support cities from Manitoba */}
                    <TextField
                      disabled={this.props.creatingListing}
                      id="city"
                      name="city"
                      variant="outlined"
                      margin="dense"
                      select
                      style = {{width: 200}}
                      label="city location"
                      value = {values.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                    >
                      {dropDownCities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    
                    {/* textfield, price of the listing */}
                    <div className = "createListing-priceArea">
                      <AttachMoneyIcon fontSize = "large" style = {{paddingTop: "10px"}}/>
                      <TextField
                        disabled={this.props.creatingListing}
                        label="Price"
                        id="price"
                        name="price"
                        className="emailField"
                        type="number"
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                        value = {values.price}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                      />
                    </div>

                    {/* This is the button that defines whether laundry room is available */}
                    <TextField
                      disabled={this.props.creatingListing}
                      label="Laundry Room"
                      id="is_laundry_available"
                      name="is_laundry_available"
                      variant="outlined"
                      margin="dense"
                      select
                      fullWidth
                      value = {values.is_laundry_available}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.is_laundry_available && Boolean(errors.is_laundry_available)}
                      helperText={touched.is_laundry_available && errors.is_laundry_available}
                    >
                      {YesNo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* This is the button that defines whether pet is allowed in the apartment */}
                    <TextField
                      disabled={this.props.creatingListing}
                      label="Pets allowed"
                      id="is_pet_allowed"
                      name="is_pet_allowed"
                      variant="outlined"
                      margin="dense"
                      select
                      fullWidth
                      value = {values.is_pet_allowed}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.is_pet_allowed && Boolean(errors.is_pet_allowed)}
                      helperText={touched.is_pet_allowed && errors.is_pet_allowed}
                    >
                      {YesNo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* This is the button that defines whether parking lot is available */}
                    <TextField
                      disabled={this.props.creatingListing}
                      label="Parking"
                      id="is_parking_available"
                      name="is_parking_available"
                      variant="outlined"
                      margin="dense"
                      select
                      fullWidth
                      value = {values.is_parking_available}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.is_parking_available && Boolean(errors.is_parking_available)}
                      helperText={touched.is_parking_available && errors.is_parking_available}
                    >
                      {YesNo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <DialogActions
                      className="createlistingDialog-Actions"
                    >
                      {/* This is the button to trigger the submit action */}
                      <Button
                        className={
                          this.props.creatingListing
                            ? "homeDialog-inProgressButton"
                            : "homeDialog-normalButton"
                        }
                        disabled = {this.props.creatingListing}
                        type="submit"
                      >
                        Create
                      </Button>
                    </DialogActions>
                  </form>
                )
              }}
            </Formik>
          </DialogContent>
        </Dialog>
        {/* End of login dialog */}
      </div >
    )
  }

  // This is the action to close the listing
  handleCloseCreateListing = (event, reason) => {
    if (reason === "clickaway")
      return
    this.setState({
      postListingMessage: false
    })
  }

  // this is what happens when user click on "X" button in the 
  // Dialog title, which closes the dialog
  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }

  // This is what happens when user click on cancel
  handleClickCancel = () => {
    this.resetDialogStatus();
  }

  // helper function to help reset the dialog status
  resetDialogStatus = () => {
    this.props.setDialogOpen(false);
    this.props.setImages([]);
    this.setState({
      postListingMessage: false,
      postListingSuccess: false
    })
  }

}

//REDUX
const mapStateToProps = state => {
  return {
    dialogOpen: state.createListingContent.dialogOpen,
    creatingListing: state.createListingContent.creatingListing,
    images: state.createListingContent.images,
    cookies: state.homeContent.cookies,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setDialogOpen,
    setImages,
    setCreatingListing,
    setListingArray
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(CreateListingButton);
