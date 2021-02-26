import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  setImages
} from "../../actions/CreateListing"
import ImageUploading from 'react-images-uploading';
import ImageIcon from '@material-ui/icons/Image';
import { Button } from "@material-ui/core";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import '../../styles/ImageUploader.css'
import "../../styles/CreateListing.css"


class ImageUploader extends Component {
  state = {
    images: []
  }

  setImages = (inputFiles) =>{
    this.setState({
      images: inputFiles
    })
  }
  
  onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    this.setImages(imageList);
    this.props.setImages(imageList)
  };

  displayImages = (imageList, onImageRemove, onImageUpdate) =>{
    let result = [];
    if (imageList.length === 0){
      result.push(
        <Typography 
          key = {-1} 
          variant="h4" 
          component="h2" 
          style = {{marginLeft: 20, color: "lightgray"}} 
          gutterBottom
        >
          Drop up to three images here
        </Typography>
      )
      return result;
    }
    for (let i = 0; i < imageList.length; i++){
      result.push(
        <div key = {i} className = "uploadedImage-box">
          <div
            className="createListingImage-preview"
          >
            {
              imageList[i]
              ?
                <img 
                  src={imageList[i].data_url}
                  alt="" 
                  className = "image"
                />
              :
                <ImageIcon
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "lightgrey"
                  }}
                  onClick={() => onImageUpdate(i)}
                />
            }
          </div>
          <div className = "createListingImage-tool">
            <Button 
              variant="contained" 
              color="primary" 
              component="span"
              disabled = {this.props.disabled}
              onClick={() => onImageRemove(i)}
              style = {{
                width: "50%",
                height: "100%"
              }}
            >
              Remove
            </Button>
            <Button
              variant="contained" 
              color="primary" 
              component="span"
              disabled = {this.props.disabled}
              onClick={() => onImageUpdate(i)}
              style = {{
                width: "50%",
                height: "100%"
              }}
            >
              Update
            </Button>
          </div>
        </div>
      )
    }
    return result;
  }

  render (){
    return(
      <ImageUploading
        multiple
        value={this.state.images}
        onChange={this.onChange}
        maxNumber={3}
        dataURLKey="data_url"
        acceptType={['jpg','png','gif']}
        maxFileSize = {524288} //max of 1 MB supported
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          dragProps,
          errors 
        }) => (
          <React.Fragment>
          {
            errors 
          ?
          <Snackbar
            open={errors.maxFileSize}
            autoHideDuration={1000}
          >
            <MuiAlert elevation={6} variant="filled" severity="warning">
              Images you uploaded is too big, please choose images less than 500 KB
            </MuiAlert>
          </Snackbar>
          : 
            null
          }
          <div className = "ImageUploadContainer">
            <div className = "OperationZone">
              <Button
                variant = "contained"
                color = "primary"
                style={{
                  width: "100%",
                  height: 50,
                  marginTop: 25,
                  marginBottom: 25
                }}
                disabled = {this.props.disabled}
                onClick={onImageUpload}
              >
                <PhotoCamera
                  style={{
                    paddingRight: 20
                  }}
                />
                Upload
              </Button>
              <Button
                variant = "contained"
                color = "primary" 
                style={{
                  width: "100%",
                  height: 50,
                  marginTop: 25,
                  marginBottom: 25
                }}
                disabled = {this.props.disabled}
                onClick={onImageRemoveAll}
              >
                Remove all
              </Button>
            </div>
            <div
              {...dragProps} 
              className = "ImageArea"
            >
              {this.displayImages(imageList, onImageRemove, onImageUpdate)}
            </div>
          </div>
          </React.Fragment>
        )}
      </ImageUploading>
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
    setImages
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ImageUploader);