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
import apartment1 from "../../resources/apartment1.jpg";
import axios from "axios";
class Listing extends Component {
  state = {
    imageSource: ""
  }

  componentDidMount (){
    // this.props.setBedRoom(2);
    // this.props.setWashRoom(10);
    // axios.get("http://localhost:3005/apartment1")
    // .then(response =>{
    //   this.setState({
    //     imageSource: response.data[0].source
    //   })
    // })
    this.setState({
      imageSource: this.getEmergencyFoundImg(apartment1)
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

  handleClick = () => {
    console.log("image source is: " + this.state.imageSource)
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
          src={`data:image/png;base64,${this.state.imageSource}`}
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


