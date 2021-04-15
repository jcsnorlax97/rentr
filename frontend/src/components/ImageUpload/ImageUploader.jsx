import React, { Component } from 'react'

import { 
  Button,
  Typography,
  Snackbar
} from "@material-ui/core";

import ImageIcon from '@material-ui/icons/Image';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImageUploading from 'react-images-uploading';

import MuiAlert from '@material-ui/lab/Alert';

import '../../styles/ImageUploader.css'
import "../../styles/CreateListing.css"


class ImageUploader extends Component {
  
  onChange = (imageList) => {
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
            {/* Show the images */}
            {
              imageList[i].data_url || String(imageList[i]).includes("data:image")
              ?
                <img 
                  src={imageList[i].data_url || imageList[i]}
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
                width: "calc(50% - 5px)",
                height: "100%",
                marginRight: 5
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
                width: "calc(50% - 5px)",
                height: "100%",
                marginLeft: 5
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
        value={this.props.value}
        onChange={this.onChange} // defines how it works when there's an image upload
        maxNumber={3} // This upload place supports up to three images 
        dataURLKey="data_url" // extract the data url from a file
        acceptType={['jpg','png','gif']} // supported image types
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
            autoHideDuration={1000}   // shows this alert when the image uploaded is too big, more than 500kb
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

              {/* This is the button for upload pictures */}
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

              {/* This is the button to remove all the pictures */}
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
              {/* Display the images */}
              {this.displayImages(imageList, onImageRemove, onImageUpdate)}
            </div>
          </div>
          </React.Fragment>
        )}
      </ImageUploading>
    )
  }
}


export default ImageUploader;