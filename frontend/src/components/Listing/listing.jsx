import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setListingArray,
  setPageNum,
  setNumPerPage
} from "../../actions/ListingDetail";
import apartment1 from "../../resources/apartment1.jpg";
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

  componentWillUnmount = () =>{
    this.props.setListingArray([])
    this.props.setPageNum(1);
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
                          <Tooltip title = "Washroom">
                            <BathtubIcon className = "listingIcon" fontSize = "large"/>
                          </Tooltip>
                        </span>

                        {/* Number of bedrooms */}
                        <span className = "listingIconNumber">
                          {listingDetail.bedroom}
                          <Tooltip title = "Bedroom">
                            <HotelIcon className = "listingIcon" fontSize = "large"/>
                          </Tooltip>
                        </span>
                        
                        {/* Number of laundry rooms */}
                        <span className = "listingIconNumber">
                          {listingDetail.laundryroom}
                          <Tooltip title = "Laundry Room">
                            <LocalLaundryServiceIcon className = "listingIcon" fontSize = "large"/>
                          </Tooltip>
                        </span>
                        
                        {/* Indicate whether pets allowed or not */}
                        <span>
                          {
                            listingDetail.pet 
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

                      </span>
                      
                      <Divider orientation="vertical" flexItem />

                      <div
                        className = "listingPrice"
                      >
                        ${listingDetail.price}
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


