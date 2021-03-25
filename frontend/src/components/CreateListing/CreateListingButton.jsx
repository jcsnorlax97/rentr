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
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import ImageUploader from "../ImageUpload/ImageUploader";
import {API_ROOT_POST, API_ROOT_GET} from "../../data/urls";

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
          {this.handleRegisterMessage()}
          <DialogTitle className="createListing-title">
            Create a Listing
            <IconButton
              disabled={this.props.creatingListing}
              className="createListing-title-closeButton"
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
            <ImageUploader disabled = {this.props.creatingListing}/>
            <Formik
              initialValues={{
                title: "", 
                description: "",
                num_bedroom: "",
                num_bathroom: "",
                price: "",
                is_laundry_available: false,
                is_pet_allowed: false,
                is_parking_available: false
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                this.props.setCreatingListing(true)

                let imageCollection = [];
                if (this.props.images && this.props.images.length !== 0){
                  for (let i = 0; i < this.props.images.length; i++){
                    imageCollection.push(this.props.images[i].data_url)
                  }
                }
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
                  .required('Parking info is required')
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
                    <div className="homeDialog-textContent">
                      <TextField
                        disabled={this.props.creatingListing}
                        label="Title"
                        id="title"
                        name="title"
                        required
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
                      <TextField
                        disabled={this.props.creatingListing}
                        label="Description"
                        id="description"
                        name="description"
                        multiline
                        required
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

                    <TextField
                      disabled={this.props.creatingListing}
                      label="Bedrooms"
                      id="num_bedroom"
                      name="num_bedroom"
                      required
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

                    <TextField
                      disabled={this.props.creatingListing}
                      required
                      id="num_bathroom"
                      name="num_bathroom"
                      variant="outlined"
                      margin="dense"
                      select
                      style = {{width: 150}}
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


                    <div className = "createListing-priceArea">
                      <AttachMoneyIcon fontSize = "large" style = {{paddingTop: "10px"}}/>
                      <TextField
                        disabled={this.props.creatingListing}
                        label="Price"
                        required
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

                    <TextField
                      disabled={this.props.creatingListing}
                      label="Laundry Room"
                      required
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

                    <TextField
                      disabled={this.props.creatingListing}
                      label="Pets allowed"
                      required
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

                    <TextField
                      disabled={this.props.creatingListing}
                      label="Parking"
                      required
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

  handleRegisterMessage = () => {
    return (
      <Snackbar open={this.state.postListingMessage} autoHideDuration={6000} onClose={this.handleCloseCreateListingSnack}>
        {this.state.postListingSuccess
          ? (
            <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseCreateListingSnack} severity="success">
              Your posting is submitted successfully, you'll be taken back to home page shortly
            </MuiAlert>
          )
          :
          (
            <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseCreateListingSnack} severity="error">
              Listing creation failed, you might need to re-login
            </MuiAlert>
          )
        }
      </Snackbar>
    )
  }

  handleCloseCreateListingSnack = (event, reason) => {
    if (reason === "clickaway")
      return
    this.setState({
      postListingMessage: false
    })
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }

  handleClickCancel = () => {
    this.resetDialogStatus();
  }

  resetDialogStatus = () => {
    this.props.setDialogOpen(false);
    this.props.setImages([]);
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
