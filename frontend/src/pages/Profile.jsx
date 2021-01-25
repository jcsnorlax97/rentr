import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Profile extends Component {
  render() {
    return (
      <div className="profilePage">
        Profile
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
export default connect(mapStateToProps, matchDispatchToProps)(Profile);
