import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setListingArray,
  setPageNum,
  setNumPerPage
} from "../../actions/ListingDetail";
import axios from "axios";
import BathtubIcon from '@material-ui/icons/Bathtub';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import PetsIcon from '@material-ui/icons/Pets';
import { 
  Divider,
  Tooltip,
  Paper
} from "@material-ui/core";
import ApartmentIcon from '@material-ui/icons/Apartment';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import {API_ROOT_GET} from "../../data/urls";
import { trackPromise } from "react-promise-tracker";
import {RefreshLoader} from "../RefreshLoader";

import "../../styles/ListingView.css";
import "../../styles/Listing.css";


class ListingViewer extends Component {

  componentDidMount (){
    this.fetchListing();
  }

  componentWillUnmount(){
    this.props.setListingArray([])
  }

  fetchListing = () =>{
    const url = String(API_ROOT_GET).concat("listing")
    trackPromise(
      axios.get(url)
      .then(response =>{
        this.props.setListingArray(response.data)
      })
    , "fetchListingArea")
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

  componentWillUnmount = () =>{
    this.props.setListingArray([])
    this.props.setPageNum(1);
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
    return (
      <div className = "listingContent">
        <div>
          {this.props.listingArray && this.props.listingArray.length !== 0 
          ? 
            this.props.listingArray.slice(1,2).map((listingDetail, index)=>{ // slice and map unnecessary
              const currIndex = this.props.pageNum * 10 + index;
              return (
                <Paper
                  key = {currIndex}
                  elevation = {3}
                  style = {{
                    width: "100%",
                    marginTop: 16,
                    marginBottom: 16
                  }}
                >
                  {/* This is for the image area 
                  
                    The image section is going to eventually need to handle multiple images. 
                    Maybe a for loop similar this could be a good replacement:
                    {imagesDummyInputs.map((source, index) => {
                          return (
                          <img
                              style = {{width: "30%",height: "30%", display: 'inline', marginLeft:'5px'}}
                              src={source}
                              alt="apartment"
                          />
                          );
                      })}
                  */}
                  <div style={{width: '100%', marginLeft:'5px', marginTop:'5px'}}>
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

                      {/* This is for the listing title area */}
                      <div className = "listingPriceText sectionPadding">
                        ${this.checkPrice(listingDetail.price)} per month
                      </div>
                              
                      <div className = "sectionPadding" style={{ fontSize: '2em' }}>
                        {listingDetail.title} 
                      </div>

                      <Divider /> 

                      
                      {/* This is for the listing icon area */}
                      <div className="sectionPadding">
                          
                        {/*Washrooms*/}
                        <span className = "listingIconText">
                          <Tooltip title = "Washroom">
                            <BathtubIcon className = "listingIcon" fontSize = "default"/>
                          </Tooltip>
                          Washrooms:&nbsp;
                          {listingDetail.num_bathroom} |
                        </span>

                        {/*Bedrooms */}
                        <span className = "listingIconText"> 
                          <Tooltip title = "Bedroom">
                            <HotelIcon className = "listingIcon" fontSize = "default"/>
                          </Tooltip>
                          Bedrooms:&nbsp;
                          {listingDetail.num_bedroom} |
                        </span>
                        
                        {/*Laundry*/}
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
                                  <br />
                                  
                        {/*Pets*/}
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
                        
                        {/*Parking*/}
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
                    
                    {/** Listing Description */}
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
            })
          : 
            <Paper
              elevation = {3}
              style = {{
                width: "auto",
                minWidth: 600,
                height: 150,
                marginTop: 16,
                marginBottom: 16
              }}
            >
              {/* {No listing information at the moment} */}
              <RefreshLoader area = "fetchListingArea"/>
            </Paper>
          }
          
        </div>
      </div>
    )
  } // end of render


}

//REDUX
const mapStateToProps = state => {
  return {
    listingArray: state.listingDetail.listingArray,
    pageNum: state.listingDetail.pageNum,
    numPerPage: state.listingDetail.numPerPage
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setListingArray,
    setPageNum,
    setNumPerPage
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(ListingViewer);


