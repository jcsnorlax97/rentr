import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAdvSearchDialog
} from "../actions/AdvancedSeach";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Snackbar,
  Select,
  Tooltip
} from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';

import "../styles/AdvancedSearch.css";

/** At some point, should move Login styles into its own thing */

// import "../../styles/Login.css"

class AdvancedSearch extends Component {

  render(){
    return(
      <span className = "AdvancedSearchButtonField">
        <Tooltip title = "Search based on keywords">
          <Button 
            className = "keywordSearchButton"
          >
            Search
          </Button>
        </Tooltip>

        <Tooltip title = "Advanced search">
          <IconButton 
            className = "advancedSearch-Button"
            edge="end"
            onClick = {this.expandAdvancedSearch}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.props.dialogOpen}
          onClose={() => {
            this.resetDialogStatus()
          }}
          maxWidth = "lg"
        >
          <DialogTitle className="advancedSearch-title">
            Advanced Search
            <IconButton
              className="advancedSearch-title-closeButton"
              onClick={this.resetDialogStatus}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>

          </DialogContent>
        </Dialog>
      </span>
    )
  }

  expandAdvancedSearch = () =>{
    this.props.setAdvSearchDialog(true)
  }

  resetDialogStatus = () =>{
    this.props.setAdvSearchDialog(false)
  }
}


//REDUX
const mapStateToProps = state => {
  return {
    dialogOpen: state.advancedSearch.dialogOpen,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setAdvSearchDialog
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(AdvancedSearch);
