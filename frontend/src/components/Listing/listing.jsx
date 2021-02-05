import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setPrice,
  setBedRoom,
  setWashRoom,
  setLaundryRoom,
  setDescription,
  setImage
} from "../../actions/ListingDetail";
// import {apartment1} from "../../resources/apartment1.jpg";
import apartment1 from "../../resources/apartment1.jpg";

class Listing extends Component {
  
  componentDidMount (){
    this.props.setBedRoom(2);
    this.props.setWashRoom(10);
  }

  render() {
    return (
      <div
        className="listing"
      >
        {/* {this.props.washRoom} */}
        <img
          style = {{
            width: "100%",
            height: "100%"
          }}
          src = {apartment1}
          alt="apartment 1"
        />
      </div>
    )
  }
}

//REDUX
const mapStateToProps = state => {
  return {
    price: state.listingDetail.price,
    bedRoom: state.listingDetail.bedRoom,
    washRoom: state.listingDetail.washRoom,
    laundryRoom: state.listingDetail.laundryRoom,
    description: state.listingDetail.description,
    imageSource: state.listingDetail.imageSource,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setPrice,
    setBedRoom,
    setWashRoom,
    setLaundryRoom,
    setDescription,
    setImage
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Listing);


