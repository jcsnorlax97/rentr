import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setListingArray,
  setPageNum,
  setNumPerPage
} from "../../actions/ListingDetail";
import {
  setListingDetail
} from "../../actions/ListingDetail";
import axios from "axios";

import { 
  Divider,
  Tooltip,
  Paper,
  IconButton,
  Typography
} from "@material-ui/core";

import BathtubIcon from '@material-ui/icons/Bathtub';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import PetsIcon from '@material-ui/icons/Pets';
import CloseIcon from '@material-ui/icons/Close';
import ApartmentIcon from '@material-ui/icons/Apartment';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import {API_ROOT_GET} from "../../data/urls";
import { trackPromise } from "react-promise-tracker";

import "../../styles/ListingView.css";
import "../../styles/Listing.css";


class ListingViewer extends Component {

  componentDidMount (){
    console.log(this.props.showListingDetail)
    console.log(this.props.selectedListing)
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
          marginLeft:16
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

        <div style={{width: '100%'}}>
          {this.checkImageValid(listingDetail.images[0])
            ?
              <img
                style = {{
                  width: "30%",
                  height: "30%"
                }}
                src={listingDetail.images[0]}
                alt="apartment"
              />
            :
              <ApartmentIcon
                style = {{
                  width: "30%",
                  height: "30%",
                  color: "lightgray"
                }}
                alt="apartment"
              />
          }
        </div>

        <div style={{marginLeft:'5px'}}>
          <div>

            <div className = "listingPriceText sectionPadding">
              ${this.checkPrice(listingDetail.price)} per month
            </div>
                    
            <div className = "sectionPadding" style={{ fontSize: '2em' }}>
              {listingDetail.title} 
            </div>

            <Divider /> 

            
            <div className="sectionPadding">
                
              <span className = "listingIconText">
                <Tooltip title = "Washroom">
                  <BathtubIcon className = "listingIcon" fontSize = "default"/>
                </Tooltip>
                Washrooms:&nbsp;
                {listingDetail.num_bathroom} |
              </span>

              <span className = "listingIconText"> 
                <Tooltip title = "Bedroom">
                  <HotelIcon className = "listingIcon" fontSize = "default"/>
                </Tooltip>
                Bedrooms:&nbsp;
                {listingDetail.num_bedroom} |
              </span>
              
              <span className = "listingIconText">
                {
                  listingDetail.is_laundry_available
                  ? 
                  <Tooltip title = "Laundry Room is available">
                    <LocalLaundryServiceIcon 
                      style = {{color: "green"}}
                      className = "listingIcon" 
                      fontSize = "default"
                    />
                  </Tooltip>
                  : 
                  <Tooltip title = "Laundry Room not available">
                    <LocalLaundryServiceIcon
                      style = {{color: "grey"}}
                      className = "listingIcon" 
                      fontSize = "default"
                    />
                  </Tooltip>
                }
                <span>
                  Laundry Room:&nbsp;
                  {listingDetail.is_laundry_available ? 'Yes' : 'No' }
                </span>
              </span>
                        
              <span className = "listingIconText">
                {
                  listingDetail.is_pet_allowed 
                  ? 
                  <Tooltip title = "Pet allowed">
                    <PetsIcon
                      style={{ color: "green" }}
                      fontSize = "default"
                      className = "listingIconNumber"
                    />
                  </Tooltip>
                  :
                  <Tooltip title = "Pet NOT allowed">
                    <PetsIcon
                      style={{ color: "grey" }}
                      fontSize = "default"
                      className = "listingIconNumber"
                    />
                  </Tooltip>
                }
                <span>
                  Pets Allowed:&nbsp;
                  {listingDetail.is_pet_allowed ? 'Yes' : 'No' } |
                  </span>
              </span>
              
              <span className = "listingIconText">
                {
                  listingDetail.is_parking_available 
                  ? 
                  <Tooltip title = "Parking is included">
                    <LocalParkingIcon
                      style={{ color: "green" }}
                      fontSize = "default"
                      className = "listingIconNumber"
                    />
                  </Tooltip>
                  :
                  <Tooltip title = "Parking NOT included">
                    <LocalParkingIcon
                      style={{ color: "grey" }}
                      fontSize = "default"
                      className = "listingIconNumber"
                    />
                  </Tooltip>
                }
                <span>
                  Parking Included:&nbsp;
                  {listingDetail.is_parking_available ? 'Yes' : 'No' }
                  </span>
              </span>

            </div>                 
          </div>

          <Divider className="sectionPadding"/>
          
          <span className="listingIconText">
              Description:
          </span>
          <div style={{marginLeft:'15px', marginTop:'5px', marginBottom:'10px'}}>      
            {listingDetail.description}
          </div>

          <Divider className="sectionPadding"/>
          
          <div className="listingIconText" style={{marginTop:'10px', paddingBottom:'20px'}}>
              Questions and Answers:
          </div>
        </div>
      </Paper>
    )
  } // end of render


}

//REDUX
const mapStateToProps = state => {
  return {
    listingArray: state.listingDetail.listingArray,
    pageNum: state.listingDetail.pageNum,
    numPerPage: state.listingDetail.numPerPage,
    showListingDetail: state.listingDetail.showListingDetail,
    selectedListing: state.listingDetail.selectedListing
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setListingArray,
    setPageNum,
    setNumPerPage,
    setListingDetail
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ListingViewer);


