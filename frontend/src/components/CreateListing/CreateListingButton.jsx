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
  setDialogOpen,
  setImages,
  setCreatingListing
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
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ImageUploader from "../ImageUpload/ImageUploader";

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

          <DialogTitle className="createListing-title">
            Create a Listing
            <IconButton
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
            <ImageUploader/>
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

                // let content = {
                //   title: String(values.title),
                //   description: String(values.description),
                //   num_bedroom: String(values.num_bedroom),
                //   num_bathroom: String(values.num_bathroom),
                //   price: String(values.price),
                //   is_laundry_available: Boolean(values.is_laundry_available),
                //   is_pet_allowed: Boolean(values.is_pet_allowed),
                //   is_parking_available: Boolean(values.is_parking_available),
                // }
                // axios.post(url, content)
                // .then(response => {
                //   // If the account is registered successfully
                //   if (response.data && response.data.userId) {
                //     this.setState({
                //       postListingMessage: true,
                //       postListingSuccess: true,
                //     })
                //     setTimeout(() => {
                //       this.resetDialogStatus()
                //       this.props.setDialogOpen(false)
                //     }, 5000);
                //   }
                //   // If the account is registered NOT successfully
                //   else {
                //     this.setState({
                //       postListingMessage: true,
                //       postListingSuccess: false,
                //     })
                //   }
                //   this.props.setCreatingListing(false)
                // })
                // // If the account is registered NOT successfully
                // .catch(error => {
                //   this.setState({
                //     postListingMessage: true,
                //     postListingSuccess: false,
                //   })
                //   this.props.setCreatingListing(false)
                //   console.log(error)
                // })
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


                    {/** new stuff */}
                    <div className = "createListing-priceArea">
                      <AttachMoneyIcon fontSize = "large" style = {{paddingTop: "10px"}}/>
                      <TextField
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
                        className="homeDialog-normalButton"
                        // onClick={this.handlePostForm}
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


  // handlePostForm = () => {
  //   this.resetDialogStatus();
  //   // console.log(this.props.title)
  //   // console.log(this.props.description)
  //   // console.log(this.props.numberOfBedrooms)
  //   // console.log(this.props.numberOfBathrooms)
  //   // console.log(this.props.price)
  //   // console.log(this.props.laundry)
  //   // console.log(this.props.petsAllowed)
  //   // console.log(this.props.parking)
  // }

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
    this.props.setImages([]);
  }

}

//REDUX
const mapStateToProps = state => {
  return {
    title: state.createListingContent.title,
    description: state.createListingContent.description,
    numberOfBedrooms: state.createListingContent.numberOfBedrooms,
    numberOfBathrooms: state.createListingContent.numberOfBathrooms,
    price: state.createListingContent.price,
    laundry: state.createListingContent.laundry,
    petsAllowed: state.createListingContent.petsAllowed,
    parking: state.createListingContent.parking,
    dialogOpen: state.createListingContent.dialogOpen,
    creatingListing: state.createListingContent.creatingListing,
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
    setDialogOpen,
    setImages,
    setCreatingListing
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(CreateListingButton);
