import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAdvSearchDialog,
  setAdvancedSearching
} from "../actions/AdvancedSeach";
import {
  setListingArray
} from "../actions/ListingDetail";
import {
  setSearchError,
  setSearchValue,
} from "../actions/HomePage";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Snackbar,
  Select,
  Tooltip,
  Typography,
  TextField
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import PetsIcon from '@material-ui/icons/Pets';

import {API_ROOT_GET} from "../data/urls";
import {dropdownNumberOptions} from "../data/dropdownData";

import "../styles/AdvancedSearch.css";

class AdvancedSearch extends Component {
  
  state = {
    searchSuccess: false,
    searchMessage: false,
    searchError: false, 
    numResults: -1
  }

  render(){
    return(
      <span className = "AdvancedSearchButtonField">
        <Tooltip title = "Search based on keywords">
          <Button 
            className = "keywordSearchButton"
            onClick = {this.searchWithKeywords}
          >
            Search
          </Button>
        </Tooltip>

        <Tooltip title = "Advanced search">
          <IconButton 
            className = "advancedSearch-Button"
            edge="end"
            onClick = {this.expandAdvancedSearch}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        {this.handleSearchMessage()}
        <Dialog
          open={this.props.dialogOpen}
          onClose={() => {
            this.resetDialogStatus()
          }}
          maxWidth = "lg"
        >
          
          <DialogTitle className="advancedSearch-title">
            Advanced Search
            <IconButton
              className="advancedSearch-title-closeButton"
              onClick={this.resetDialogStatus}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>

            <Formik
              initialValues={{ 
                min_price: "", 
                max_price: "",
                min_num_bathroom: "",
                max_num_bathroom: "",
                min_num_bedroom: "",
                max_num_bedroom: "",
                is_laundry_available: false,
                is_pet_allowed: false,
                is_parking_available: false,
                keywords: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                this.resetDialogStatus()
                this.props.setAdvancedSearching(true)
                let url = API_ROOT_GET.concat("listing?")
                if (String(values.min_price) !== ""){
                  url = url.concat("&min_price=",values.min_price)
                }
                if (String(values.max_price) !== ""){
                  url = url.concat("&max_price=",values.max_price)
                }
                if (String(values.min_num_bathroom) !== ""){
                  url = url.concat("&min_num_bathroom=",values.min_num_bathroom)
                }
                if (String(values.max_num_bathroom) !== ""){
                  url = url.concat("&max_num_bathroom=",values.max_num_bathroom)
                }
                if (String(values.min_num_bedroom) !== ""){
                  url = url.concat("&min_num_bedroom=",values.min_num_bedroom)
                }
                if (String(values.max_num_bedroom) !== ""){
                  url = url.concat("&max_num_bedroom=",values.max_num_bedroom)
                }
                if (String(values.is_laundry_available) !== ""){
                  url = url.concat("&is_laundry_available=",values.is_laundry_available)
                }
                if (String(values.is_pet_allowed) !== ""){
                  url = url.concat("&is_pet_allowed=",values.is_pet_allowed)
                }
                if (String(values.is_parking_available) !== ""){
                  url = url.concat("&is_parking_available=",values.is_parking_available)
                }
                if (String(values.keywords) !== ""){
                  url = url.concat("&keywords=",values.keywords)
                }
                console.log(url)
                axios.get(url)
                .then(response => {
                  // this is when search was successful
                  if (response.status === 200 
                    && response.data.length !== 0
                    ){
                    this.setState({
                      searchMessage: true,
                      searchSuccess: true,
                      searchError: false,
                      numResults: response.data.length
                    })
                    this.props.setAdvancedSearching(false)
                    this.props.setListingArray(response.data)
                  }
                  // not successful
                  else {
                    this.setState({
                      searchMessage: true,
                      searchSuccess: false,
                      searchError: false,
                    })
                    this.props.setAdvancedSearching(false)
                  }
                })
                //resulted in an error
                .catch(error => {
                  this.setState({
                    searchMessage: true,
                    searchSuccess: false,
                    searchError: true
                  })
                  console.log(error)
                  this.props.setAdvancedSearching(false)
                })
              }}
              validationSchema={yup.object().shape({
                min_price: yup
                  .number('Enter minimum price')
                  .positive('Enter a positive number'),
                max_price: yup
                  .number('Enter minimum price')
                  .positive('Enter a positive number'),
                min_num_bathroom: yup
                  .number('Enter minimum bathrooms required')
                  .positive('Enter a positive number'),
                max_num_bathroom: yup
                  .number('Enter maximum bathrooms required')
                  .positive('Enter a positive number'),
                min_num_bedroom: yup
                  .number('Enter  minimum bedrooms required')
                  .positive('Enter a positive number'),
                max_num_bedroom: yup
                  .number('Enter maximum bedrooms required')
                  .positive('Enter a positive number'),
                is_laundry_available: yup
                  .boolean("Choose if laundry is required")
                  .required("This field is required"),
                is_pet_allowed: yup
                  .boolean("Choose if laundry is required")
                  .required("This field is required"),
                is_parking_available: yup
                  .boolean("Choose if laundry is required")
                  .required("This field is required"),
                keywords: yup
                  .string("Search by keywords")
              })}
            >
              {props => {
                const {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <div className = "advancedSearchForm">
                      <span className = "advancedSearchForm_min_price">
                        <Typography>
                          Min Price: 
                        </Typography>
                        <TextField
                          name = "min_price"
                          type="number"
                          style = {{
                            marginLeft:10,
                            width: 200
                          }}
                          value = {values.min_price}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={touched.min_price && Boolean(errors.min_price)}
                          helperText="Enter min price for your search"
                        />
                      </span>
                      <span className = "advancedSearchForm_max_price">
                        <Typography>
                          Max price: 
                        </Typography>
                        <TextField
                          name = "max_price"
                          type="number"
                          style = {{
                            marginLeft:10,
                            width: 200
                          }}
                          value = {values.max_price}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={touched.max_price && Boolean(errors.max_price)}
                          helperText="Enter max price for your search"
                        />
                      </span>
                      <span className = "advancedSearchForm_min_num_bathroom">
                        <Typography className = "advancedSearchForm_numberDropdown">
                          Min bathrooms: 
                        </Typography>
                        <Select
                          name = "min_num_bathroom"
                          style = {{
                            width: 100
                          }}
                          value = {values.min_num_bathroom}
                          onBlur = {handleBlur}
                          onChange = {handleChange}
                          error={touched.min_num_bathroom && Boolean(errors.min_num_bathroom)}
                        >
                          {dropdownNumberOptions.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </span>
                      <span className = "advancedSearchForm_max_num_bathroom">
                        <Typography className = "advancedSearchForm_numberDropdown">
                          Max bathrooms: 
                        </Typography>
                        <Select
                          name = "max_num_bathroom"
                          style = {{
                            width: 100
                          }}
                          value = {values.max_num_bathroom}
                          onBlur = {handleBlur}
                          onChange = {handleChange}
                          error={touched.max_num_bathroom && Boolean(errors.max_num_bathroom)}
                        >
                          {dropdownNumberOptions.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </span>

                      <span className = "advancedSearchForm_min_num_bedroom">
                        <Typography className = "advancedSearchForm_numberDropdown">
                          Min bedrooms: 
                        </Typography>
                        <Select
                          name = "min_num_bedroom"
                          style = {{
                            width: 100
                          }}
                          value = {values.min_num_bedroom}
                          onBlur = {handleBlur}
                          onChange = {handleChange}
                          error={touched.min_num_bedroom && Boolean(errors.min_num_bedroom)}
                        >
                          {dropdownNumberOptions.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </span>

                      <span className = "advancedSearchForm_max_num_bedroom">
                        <Typography className = "advancedSearchForm_numberDropdown">
                          Max bedrooms: 
                        </Typography>
                        <Select
                          name = "max_num_bedroom"
                          style = {{
                            width: 100
                          }}
                          value = {values.max_num_bedroom}
                          onBlur = {handleBlur}
                          onChange = {handleChange}
                          error={touched.max_num_bedroom && Boolean(errors.max_num_bedroom)}
                        >
                          {dropdownNumberOptions.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>  
                      </span>
                      
                      <span className = "advancedSearchForm-iconButtons">

                        <Tooltip title = {
                          values.is_laundry_available
                          ? 
                          "Laundry room available" 
                          : 
                          "Laundry room not available"
                        }>
                          <IconButton
                            onClick = {e=>{
                              setFieldValue('is_laundry_available', !values.is_laundry_available)
                            }}
                          >
                            <LocalLaundryServiceIcon 
                              style = {{
                                color: values.is_laundry_available ? 'green' : 'grey'
                              }}
                              className = "listingIcon" 
                              fontSize = "large"
                            />
                          </IconButton>
                        </Tooltip>
                            
                        <Tooltip title = {
                          values.is_pet_allowed
                          ? 
                          "Laundry room available" 
                          : 
                          "Laundry room not available"
                        }>
                          <IconButton
                            onClick = {e=>{
                              setFieldValue('is_pet_allowed', !values.is_pet_allowed)
                            }}
                          >
                            <PetsIcon 
                              style = {{
                                color: values.is_pet_allowed ? 'green' : 'grey'
                              }}
                              className = "listingIcon" 
                              fontSize = "large"
                            />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title = {
                          values.is_parking_available
                          ? 
                          "Laundry room available" 
                          : 
                          "Laundry room not available"
                        }>
                          <IconButton
                            onClick = {e=>{
                              setFieldValue('is_parking_available', !values.is_parking_available)
                            }}
                          >
                            <LocalParkingIcon 
                              style = {{
                                color: values.is_parking_available ? 'green' : 'grey'
                              }}
                              className = "listingIcon" 
                              fontSize = "large"
                            />
                          </IconButton>
                        </Tooltip>

                      </span>
                    
                      <DialogActions className="advancedSearchDialog-Actions">
                        <Button
                          className={
                            this.props.advancedSearching
                              ? "advancedSearchDialog-inProgressButton"
                              : "advancedSearchDialog-normalButton"
                          }
                          type="submit"
                          disabled={this.props.advancedSearching}
                        >
                          {this.props.advancedSearching ? "Searching" : "Search"}
                        </Button>
                        <div style={{ flex: '1 0 0' }} />
                      </DialogActions>
                    </div>
                  </form>
                )
              }}
            </Formik>
          </DialogContent>
        </Dialog>
      </span>
    )
  }

  handleSearchMessage = () =>{
    let alertMessage;
    if (this.state.searchSuccess) {
      alertMessage = (
        <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSearchMessage} severity="success">
          Search returned with {this.state.numResults} result
        </MuiAlert>
      )
    }
    else if (!this.state.searchSuccess && !this.state.searchError) {
      alertMessage = (
        <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSearchMessage} severity="error">
          Current search does not return any result
        </MuiAlert>
      )
    }
    else if (!this.state.searchSuccess && this.state.searchError) {
      alertMessage = (
        <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSearchMessage} severity="warning">
          Server Error, please try again later
        </MuiAlert>
      )
    }
    return (
      <Snackbar
        open={this.state.searchMessage}
        autoHideDuration={4000}
        onClose={this.handleCloseSearchMessage}
      >
        {alertMessage}
      </Snackbar>
    )
  }

  searchWithKeywords = () => {
    if (String(this.props.searchFieldValue).trim() === ""){
      this.props.setSearchError(true)
    }
    else{
      this.resetDialogStatus()
      const url = API_ROOT_GET.concat(
        "listing?keywords=",
        this.props.searchFieldValue
      )
      axios.get(url)
      .then(response =>{
        if(response.status === 200 && response.data.length !== 0){
          this.setState({
            searchMessage: true,
            searchSuccess: true,
            searchError: false,
            numResults: response.data.length
          })
          this.props.setListingArray(response.data)
        }
        else{
          this.setState({
            searchMessage: true,
            searchSuccess: false,
            searchError: false,
          })
        }
      })
      .catch(error => {
        this.setState({
          searchMessage: true,
          searchSuccess: false,
          searchError: true
        })
        console.log(error)
      })
    }
  }

  handleCloseSearchMessage = () => {
    this.setState({
      searchMessage: false
    })
  }

  expandAdvancedSearch = () =>{
    this.props.setAdvSearchDialog(true)
  }

  resetDialogStatus = () =>{
    this.props.setAdvSearchDialog(false)
    this.setState({
      searchMessage: false,
      searchError: false,
      searchSuccess: false,
      numResults: -1
    })
  }
}


//REDUX
const mapStateToProps = state => {
  return {
    dialogOpen: state.advancedSearch.dialogOpen,
    advancedSearching: state.advancedSearch.advancedSearching,
    searchFieldError: state.homeContent.searchFieldError,
    searchFieldValue: state.homeContent.searchFieldValue,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setAdvSearchDialog,
    setAdvancedSearching,
    setListingArray,
    setSearchError,
    setSearchValue,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(AdvancedSearch);
