import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Apartment extends Component {
  render() {
    return (
      <div className="apartmentPage">
        Apartment Details
      </div>
    )
  }
}

//REDUX
const mapStateToProps = state => {
  return {
    state: state.content,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Apartment);
