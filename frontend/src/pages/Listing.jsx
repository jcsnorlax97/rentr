import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Listing extends Component {
  render() {
    return (
      <div className="ListingPage">
        Post an Ad
      </div>
    )
  }
}

//REDUX
const mapStateToProps = state => {
  return {
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Listing);
