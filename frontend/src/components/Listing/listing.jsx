import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setListingArray,
  setPageNum,
  setNumPerPage
} from "../../actions/ListingDetail";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import BathtubIcon from '@material-ui/icons/Bathtub';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import PetsIcon from '@material-ui/icons/Pets';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import ApartmentIcon from '@material-ui/icons/Apartment';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import {API_ROOT_GET} from "../../data/urls";

import "../../styles/Listing.css";

class Listing extends Component {

  componentDidMount (){
    this.fetchListing();
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
        <div className="leftPanel">
          {/* {this.props.listingArray.map(listingDetail, index) => (

          )} */}
          {this.props.listingArray && this.props.listingArray.length !== 0 
          ? 
            this.props.listingArray
            .slice((this.props.pageNum - 1) * 10, this.props.pageNum * 10)
            .map((listingDetail, index)=>{
            // return
              const currIndex = this.props.pageNum * 10 + index;
              return (
                <Paper
                  key = {currIndex}
                  elevation = {3}
                  style = {{
                    width: "100%",
                    minWidth: 600,
                    height: 150,
                    marginTop: 16,
                    marginBottom: 16
                  }}
                  className = "individualListingContent"
                >
                  {/* This is for the image area */}
                  <span className = "listingImageArea">
                    {this.checkImageValid(listingDetail.images[0])
                      ?
                        <img
                          style = {{
                            width: "100%",
                            height: "100%"
                          }}
                          src={listingDetail.images[0]}
                          alt="apartment"
                        />
                      :
                        <ApartmentIcon
                          style = {{
                            width: "100%",
                            height: "100%",
                            color: "lightgray"
                          }}
                          alt="apartment"
                        />
                    }
                      
                  </span>

                  <div className = "listingTextAndIcon">
                    <span className = "listingHeader">
                    
                      {/* This is for the listing title area */}
                      <span className = "listingTitle">
                        {listingDetail.title}
                      </span>

                      <Typography
                        type="title"
                        color="inherit" 
                        style={{
                          flex: 1 
                        }}
                      />
                
                      {/* This is for the listing icon area */}
                      <span className = "listingIconGroup">
                        {/* number of washrooms*/}
                        <span className = "listingIconNumber">
                          {listingDetail.num_bathroom}
                          <Tooltip title = "Washroom">
                            <BathtubIcon className = "listingIcon" fontSize = "large"/>
                          </Tooltip>
                        </span>

                        {/* Number of bedrooms */}
                        <span className = "listingIconNumber">
                          {listingDetail.num_bedroom}
                          <Tooltip title = "Bedroom">
                            <HotelIcon className = "listingIcon" fontSize = "large"/>
                          </Tooltip>
                        </span>
                        
                        {/* Number of laundry rooms */}
                        <span className = "listingIconNumber">
                          {
                            listingDetail.is_laundry_available
                            ?
                            <Tooltip title = "Laundry Room is available">
                              <LocalLaundryServiceIcon 
                                style = {{color: "green"}}
                                className = "listingIcon" 
                                fontSize = "large"
                              />
                            </Tooltip>
                            :
                            <Tooltip title = "Laundry Room not available">
                              <LocalLaundryServiceIcon
                                style = {{color: "grey"}}
                                className = "listingIcon" 
                                fontSize = "large"
                              />
                            </Tooltip>
                          }
                        </span>
                        
                        {/* Indicate whether pets allowed or not */}
                        <span>
                          {
                            listingDetail.is_pet_allowed 
                            ? 
                            <Tooltip title = "Pet allowed">
                              <PetsIcon
                                style = {{color: "green"}}
                                className = "listingIconNumber"
                              />
                            </Tooltip>
                            :
                            <Tooltip title = "Pet NOT allowed">
                              <PetsIcon
                                style = {{color: "grey"}}
                                className = "listingIconNumber"
                              />
                            </Tooltip>
                          }
                        </span>
                        
                        {/* Indicate whether parking included or not */}
                        <span>
                          {
                            listingDetail.is_parking_available 
                            ? 
                            <Tooltip title = "Parking is included">
                              <LocalParkingIcon
                                style = {{color: "green"}}
                                className = "listingIconNumber"
                              />
                            </Tooltip>
                            :
                            <Tooltip title = "Parking NOT included">
                              <LocalParkingIcon
                                style = {{color: "grey"}}
                                className = "listingIconNumber"
                              />
                            </Tooltip>
                          }
                        </span>

                      </span>
                      
                      <Divider orientation="vertical" flexItem />

                      <div
                        className = "listingPrice"
                      >
                        ${this.checkPrice(listingDetail.price)}
                      </div>

                    </span>

                    <Divider/>

                    <div className = "listingDescription">
                      {listingDetail.description}
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
              <h2>
                No listing information at the moment
              </h2>
            </Paper>
          }
          {/* <img
            style = {{
              width: "100%",
              height: "100%"
            }}
            // src={`data:image/png;base64,${this.state.imageSource}`}
            alt="apartment 1"
          /> */}
          <div className = "paginationArea">
            <div className = "paginationSelect">
              {/* Pagination for the listings, default to have 10 listings per page */}
              <Pagination
                style = {{
                  marginRight: 10
                }}
                variant="outlined"
                showFirstButton
                showLastButton
                count={
                  this.props.listingArray.length % 10 === 0 
                  ? parseInt (this.props.listingArray.length / 10)
                  : parseInt (this.props.listingArray.length / 10) + 1
                }
                page={this.props.pageNum}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>

        <div className = "rightPanel">
          <Tooltip title = "back to top">
            <ExpandLessIcon
              fontSize = "large"
              className = "scrollTopIcon"
              onClick = {()=>{
                window.scrollTo({top: 0, behavior: "smooth"})
              }}
            />
          </Tooltip>
        </div>
      </div>
    )
  } // end of render

  handleChange = (event, value) =>{
    this.props.setPageNum(value);
  }

  handleChangeNumPerPage = (event) =>{
    this.props.setNumPerPage(event.target.value);
  }
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
export default connect(mapStateToProps, matchDispatchToProps)(Listing);


