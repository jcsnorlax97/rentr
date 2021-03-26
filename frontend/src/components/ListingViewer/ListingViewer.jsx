import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setListingArray,
  setPageNum,
  setNumPerPage,
  setListingDetail,
  setQnAInfo,
  setComment,
  setNewQuestion
} from "../../actions/ListingDetail";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import {
  Button,
  Tooltip,
  Paper,
  IconButton,
  Typography,
  MenuItem,
  TextField,
  DialogActions
} from "@material-ui/core";

import BathtubIcon from '@material-ui/icons/Bathtub';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import PetsIcon from '@material-ui/icons/Pets';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalParkingIcon from '@material-ui/icons/LocalParking';

import {dropdownNumberOptions} from "../../data/dropdownData";
import {API_ROOT_POST, API_ROOT_GET} from "../../data/urls";

import ImageUploader from "../ImageUpload/ImageUploader";
import "../../styles/ListingView.css";
import "../../styles/Listing.css";

class ListingViewer extends Component {

  state = {
    updateListingMessage: false,
    updatelistingSuccess: false,
  }
  componentDidMount (){
    this.fetchQnAInfo(this.props.selectedListing.id)
  }

  componentDidUpdate (prevProps, prevState){
    if (prevProps.selectedListing.id !== this.props.selectedListing.id){
      this.fetchQnAInfo(this.props.selectedListing.id)
    }
  }

  fetchListing = () =>{
    const url = String(API_ROOT_GET).concat("listing")
    axios.get(url)
    .then(response =>{
      this.props.setListingArray(response.data)
    })
  }

  checkImageValid = (imgString) =>{
    let standard = new RegExp("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$")
    let newString;
    if (String(imgString).includes("data:image/jpeg;base64,")){
      newString = String(imgString).replace("data:image/jpeg;base64,", "")
    }
    else if (String(imgString).includes("data:image/gif;base64,")){
      newString = String(imgString).replace("data:image/gif;base64,", "")
    }
    else if (String(imgString).includes("data:image/png;base64,")){
      newString = String(imgString).replace("data:image/png;base64,", "")
    }
    else{
      return false
    }
    return standard.test(newString)
  }

  checkPrice = (priceString) =>{
    let newPrice = ""
    if (String(priceString).trim().length >= 7){
      newPrice = parseInt(priceString) / 1000000
      newPrice = String(newPrice).concat("M")
    }
    else if (String(priceString).trim().length >= 5){
      newPrice = parseInt(priceString) / 1000
      newPrice = String(newPrice).concat("K")
    }
    else{
      newPrice = priceString
    }
    return newPrice
  }

  render() {
    const listingDetail = this.props.selectedListing
    return (
      <Paper
        elevation = {3}
        style = {{
          width: "100%",
          marginLeft:16,
          position: "sticky",
          top: 84
        }}
      > 
        <div className = "listingDetailHeader">
          <Typography
            style = {{
              fontWeight: 700,
              fontSize: 26,
              fontFamily: "cursive",
              marginLeft: 16
            }}
          >
            Listing Detail
          </Typography>
          <Typography
            style = {{
              flex:1
            }}
          />
          <IconButton
            className="listingDetailHeader-closeButton"
            onClick={() => {
              this.props.setListingDetail({
                open: false,
                selectedListing: null
              })
            }}
          >
            <CloseIcon/>
          </IconButton>
        </div>

        <div className = "listingPriceText sectionPadding">
          ${this.checkPrice(listingDetail.price)} per month
        </div>
        <div className = "listingDetailImageUploader">
          {this.props.readOnly 
          ?
            this.props.images.map((image, index)=>{
              return(
                <img 
                  key = {index}
                  src={image.data_url || image}
                  alt="" 
                  className = "image"
                />
              )
            })
          : <ImageUploader />
          }
          
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            title: listingDetail.title, 
            description: listingDetail.description,
            num_bedroom: listingDetail.num_bedroom,
            num_bathroom: listingDetail.num_bathroom,
            price: listingDetail.price,
            is_laundry_available: listingDetail.is_laundry_available,
            is_pet_allowed: listingDetail.is_pet_allowed,
            is_parking_available: listingDetail.is_parking_available
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)

            let imageCollection = this.props.images
            // if (this.props.detailImages && this.props.detailImages.length !== 0){
            //   for (let i = 0; i < this.props.detailImages.length; i++){
            //     if (this.props.detailImages[i].data_url){
            //       imageCollection.push(this.props.detailImages[i].data_url)
            //     }
            //     else{
            //       imageCollection.push(this.props.detailImages[i])
            //     }
            //   }
            // }
            let url = API_ROOT_POST.concat(
              "listing/",
              listingDetail.id
            )
            let body = {
              images: imageCollection,
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
            axios.put(url, body,config)
            .then(response => {
              // If the account is registered successfully
              if (response.data 
                && response.data.message === "Listing has been updated successfully!") {
                this.setState({
                  updateListingMessage: true,
                  updatelistingSuccess: true,
                })
                this.fetchListing()
              }
              // If the account is registered NOT successfully
              else {
                this.setState({
                  updateListingMessage: true,
                  updatelistingSuccess: false,
                })
              }
            })
            // If the account is registered NOT successfully
            .catch(error => {
              this.setState({
                updateListingMessage: true,
                updatelistingSuccess: false,
              })
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
              handleSubmit,
              setFieldValue
            } = props;
            return(
              <form onSubmit={handleSubmit}>
                <div className="listingdetail-textContent">
                  <TextField
                    label = "title"
                    name="title"
                    fullWidth
                    type="text"
                    inputProps={{ 
                      maxLength: 100,
                      readOnly: this.props.readOnly
                    }}
                    value = {values.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </div>
                
                <div className="listingdetail-textContent">
                  <TextField
                    
                    label = "description"
                    name="description"
                    multiline
                    fullWidth
                    rows={8}
                    margin="dense"
                    type="text"
                    inputProps={{ 
                      maxLength: 5000,
                      readOnly: this.props.readOnly
                    }}
                    value = {values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </div>

                <div className = "firstLine">
                  <Tooltip title = "Bedroom">
                    <HotelIcon className = "listingIcon" fontSize = "large"/>
                  </Tooltip>
                  <TextField
                    
                    label = "bedroom"
                    name="num_bedroom"
                    variant="outlined"
                    margin="dense"
                    select
                    style = {{width: 150, marginRight: 30}}
                    inputProps={{ 
                      color: 'green',
                      readOnly: this.props.readOnly
                    }}
                    value = {values.num_bedroom}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.num_bedroom && Boolean(errors.num_bedroom)}
                    helperText={touched.num_bedroom && errors.num_bedroom}
                  >
                    {dropdownNumberOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  
                  <Tooltip title = "Washroom">
                    <BathtubIcon className = "listingIcon" fontSize = "large"/>
                  </Tooltip>
                  <TextField
                    inputProps={{
                      readOnly: this.props.readOnly
                    }}
                    label = "washroom"
                    name="num_bathroom"
                    variant="outlined"
                    margin="dense"
                    select
                    style = {{width: 150}}
                    value = {values.num_bathroom}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.num_bathroom && Boolean(errors.num_bathroom)}
                    helperText={touched.num_bathroom && errors.num_bathroom}
                  >
                    {dropdownNumberOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                
                <div className = "secondLine">
                  <AttachMoneyIcon fontSize = "large" style = {{paddingTop: "10px"}}/>
                  <TextField
                    inputProps={{
                      readOnly: this.props.readOnly
                    }}
                    label = "price"
                    name="price"
                    type="number"
                    value = {values.price}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                  />

                  <Tooltip title = {
                    values.is_laundry_available
                    ? 
                    "Laundry room available" 
                    : 
                    "Laundry room not available"
                  }>
                    <IconButton
                      onClick = {e=>{
                        if (!this.props.readOnly){
                          setFieldValue('is_laundry_available', !values.is_laundry_available)
                        }
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
                    "pet is allowed" 
                    : 
                    "pet is not allowed"
                  }>
                    <IconButton
                      onClick = {e=>{
                        if (!this.props.readOnly){
                          setFieldValue('is_pet_allowed', !values.is_pet_allowed)
                        }
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
                    "parking available"
                    : 
                    "parking not available"
                  }>
                    <IconButton
                      onClick = {e=>{
                        if (!this.props.readOnly){
                          setFieldValue('is_parking_available', !values.is_parking_available)
                        }
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
                </div>

                <DialogActions className="listingDetail-submitSection">
                  {this.props.readOnly 
                  ? null
                  :
                  <Button 
                    style = {{
                      backgroundColor: "#f0c14b",
                      color: "black",
                      fontSize: 18,
                      fontWeight: 600
                    }}
                    type="submit"
                  >
                    Update
                  </Button>
                  }
                  
                </DialogActions>
              </form>
            )
          }}
        </Formik>

        <div className="listingIconText" style={{marginTop:'10px', paddingBottom:'20px', display: 'inline'}}>
          Questions and Answers:
          {this.displayQnAInfo()}
          <div style={{ marginTop: '10px' }}>Didn't find your answer? Post a question!</div>
          <div style={{width:'60%'}}>
          <TextField 
            label="Add question" 
            variant="outlined" 
            size="small" 
            multiline
            style = {{
              marginRight: 20
            }}
            inputProps={{ maxLength: 100 }}
            value = {this.props.newQuestion}
            onChange = {(event)=>{this.props.setNewQuestion(event.target.value)}}
          />
          <Button 
            style = {{
              width: 100,
              height: "100%",
              backgroundColor: "#f0c14b",
              color: "black",
              fontSize: 16,
              fontWeight: 600
            }}
            onClick = {(event)=>{
            this.handleCreateNewQuestion()
          }}>Create</Button>
          </div>
        </div>
      </Paper>
    )
  } // end of render

  handleCreateNewQuestion = () =>{
    if (this.props.newQuestion !== ""){
      const url = API_ROOT_POST.concat(
        "listing/",
        this.props.selectedListing.id,
        "/chain"
      )
      const body = {
        comment: this.props.newQuestion
      }
      const config = {
        headers: { Authorization: `Bearer ${this.props.cookies.get("status")}` }
      };
      axios.post(url, body, config)
      .then(response=>{
        // if (response.data.message === "Comment has been created successfully!"){
          this.fetchQnAInfo(this.props.selectedListing.id)
          this.props.setNewQuestion("")
        // }
      })
    }
  }

  handleReply = (chainid) =>{
    if (this.props.comment !== ""){
      const url = API_ROOT_POST.concat(
        "listing/",
        this.props.selectedListing.id,
        "/chain/",
        chainid,
        "/comment"
      )
      const body = {
        comment: this.props.comment
      }
      const config = {
        headers: { Authorization: `Bearer ${this.props.cookies.get("status")}` }
      };
      axios.post(url, body, config)
      .then(response=>{
        if (response.data.message === "Comment has been created successfully!"){
          this.fetchQnAInfo(this.props.selectedListing.id)
          this.props.setComment("")
        }
      })
    }
  }

  displayQnAInfo = () =>{
    let result = []
    if (this.props.qnaInfo !== null && this.props.qnaInfo.length !== 0){
      for (let i = 0; i < this.props.qnaInfo.length; i++){
        result.push(
          <div className = "sectionPadding">
            <div className="questionQnA">Q: {this.props.qnaInfo[i].questionBody}
            
                {this.displayQnAAnswer(this.props.qnaInfo[i])}
                <div className = "detailListing-QnA-Comment-of-Questions">
                  <TextField 
                    key = {"newanswer".concat(i)}
                    className="replyField" 
                    label="Reply to thread" 
                    variant="outlined" 
                    size="small"
                    multiline
                    inputProps={{ maxLength: 100 }}
                    style = {{
                      marginRight: 20
                    }}
                    value = {this.props.comment}
                    onChange = {(event)=>{this.props.setComment(event.target.value)}}
                  />
                  <Button 
                    style = {{
                      width: 50,
                      height: "100%",
                      backgroundColor: "#f0c14b",
                      color: "black",
                      fontSize: 16,
                      fontWeight: 600
                    }}
                    onClick = {(event)=>{
                    this.handleReply(this.props.qnaInfo[i].chainid)
                  }}>Reply</Button>
                </div>
              </div>
          </div>
        )
      }
    }
    return result
  }

  displayQnAAnswer = (question, index) =>{
    let result = []
    for (let i = 0 ; i < question.replies.length; i++){
      result.push(
        <div className="answerQnA" style={{backgroundColor: (i % 2 === 0) ? '#EEEFFF' : '#white' }}>
          {(question.replies[i].userid === (this.props.selectedListing.userid).toString())
            ?
            <div className="landlordText">⭐landlord replied:</div>
            :
            <div className="userText">user replied:</div>
          }
          - {question.replies[i].content}
        </div>
      )
    }
    return result
  }

  fetchQnAInfo(listingId) {
    const url = String(API_ROOT_GET).concat("listing/" + listingId.toString() + "/comment")
    let result = [];
    let chainid = -1
    let counter
    axios.get(url)
    .then(response => {
      const comments = response.data
      counter = 0
      for (let i = 0; i < comments.length; i++){
        //start of a new question
        if (chainid !== comments[i].chainid){
          chainid = comments[i].chainid
          result.push({
            questionBody: String(comments[i].comment),
            chainid : comments[i].chainid,
            replies: []
          })
          counter ++
        }
        else{
          result[counter-1].replies.push({
            userid: comments[i].userid,
            content: String(comments[i].comment)
          })
        }
      }
      this.props.setQnAInfo(result)
    })
  }

}

//REDUX
const mapStateToProps = state => {
  return {
    listingArray: state.listingDetail.listingArray,
    pageNum: state.listingDetail.pageNum,
    numPerPage: state.listingDetail.numPerPage,
    showListingDetail: state.listingDetail.showListingDetail,
    selectedListing: state.listingDetail.selectedListing,
    readOnly: state.listingDetail.readOnly,
    cookies: state.homeContent.cookies,
    images: state.createListingContent.images,
    qnaInfo: state.listingDetail.qnaInfo,
    comment: state.listingDetail.comment,
    newQuestion: state.listingDetail.newQuestion,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setListingArray,
    setPageNum,
    setNumPerPage,
    setListingDetail,
    setQnAInfo,
    setComment,
    setNewQuestion
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ListingViewer);


