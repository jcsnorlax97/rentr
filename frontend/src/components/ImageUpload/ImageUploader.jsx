import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  setImages,
  resetImages
} from "../../actions/CreateListing"
import _ from "lodash";

import '../../styles/ImageUploader.css'


class ImageUploader extends Component {
  state = {
    pictures: []
  }

  onDrop(pictureFiles) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
    });
  }

  render (){
    return(
      <div>
      </div>
    )
  }
}

//REDUX
const mapStateToProps = state => {
  return {
    images: state.createListingContent.images
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setImages,
    resetImages
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ImageUploader);