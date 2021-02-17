import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setListingArray
} from "../../actions/ListingDetail";
import apartment1 from "../../resources/apartment1.jpg";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import BathtubIcon from '@material-ui/icons/Bathtub';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import PetsIcon from '@material-ui/icons/Pets';
import Divider from '@material-ui/core/Divider';
import { Typography } from "@material-ui/core";

import "../../styles/Listing.css";

class Listing extends Component {

  componentDidMount (){
    // axios.get("http://localhost:3005/apartment1")
    // .then(response =>{
    //   this.setState({
    //     imageSource: response.data[0].source
    //   })
    // })

    // this.setState({
    //   imageSource: this.getEmergencyFoundImg(apartment1)
    // })
    axios.get("http://localhost:3005/listingArray")
    .then(response =>{
      this.props.setListingArray(response.data)
    })
  }

  getEmergencyFoundImg = (urlImg) => {
    var img = new Image();
    img.src = urlImg;
    img.crossOrigin = 'Anonymous';
  
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
  
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
  
    var b64 = canvas.toDataURL('image/png').replace(/^data:image.+;base64,/, '');
    return b64;
  };

  render() {
    return (
      <div
        className="listingContent"
      >
        {/* {this.props.listingArray.map(listingDetail, index) => (

        )} */}
        {this.props.listingArray && this.props.listingArray.length !== 0 
        ? 
          this.props.listingArray.map((listingDetail, index)=>{
          // return
          return (
            <Paper
              key = {index}
              elevation = {3}
              style = {{
                width: "90%",
                minWidth: 600,
                height: 150,
                margin: 16
              }}
              className = "individualListingContent"
            >
              {/* This is for the image area */}
              <span className = "listingImageArea">
                <img
                  style = {{
                    width: "100%",
                    height: "100%"
                  }}
                  // src={`data:image/png;base64,${this.state.imageSource}`}
                  src={apartment1}
                  alt="apartment"
                />
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
                      {listingDetail.washroom}
                      <BathtubIcon className = "listingIcon" fontSize = "large"/>
                    </span>

                    {/* Number of bedrooms */}
                    <span className = "listingIconNumber">
                      {listingDetail.bedroom}
                      <HotelIcon className = "listingIcon" fontSize = "large"/>
                    </span>
                    
                    {/* Number of laundry rooms */}
                    <span className = "listingIconNumber">
                      {listingDetail.laundryroom}
                      <LocalLaundryServiceIcon className = "listingIcon" fontSize = "large"/>
                    </span>
                    
                    {/* Indicate whether pets allowed or not */}
                    <span>
                      <PetsIcon
                        style = {
                          listingDetail.pet 
                          ? {color: "green"} // if allowed, show color as green
                          : {color: "grey"}  // else, show color as grey
                        }
                        className = "listingIconNumber"
                      />
                    </span>

                  </span>
                  
                  <Divider orientation="vertical" flexItem />

                  <span
                    className = "listingPrice"
                  >
                    ${listingDetail.price}
                  </span>

                </span>

                <Divider/>

                <div className = "listingDescription">
                  {listingDetail.description}
                </div>

              </div>
            </Paper>
          )})
        : 
          <Paper
            elevation = {3}
            style = {{
              width: "auto",
              minWidth: 600,
              height: 150,
              margin: 20
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
      </div>
    )
  }
}

//REDUX
const mapStateToProps = state => {
  return {
    listingArray: state.listingDetail.listingArray,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setListingArray,
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Listing);


