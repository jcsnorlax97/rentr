import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setQnAInfo,
  setComments,
  setNewQuestion
} from "../../actions/ListingDetail";
import axios from "axios";
import _ from "lodash";

import {
  Button,
  TextField
} from "@material-ui/core";

import {API_ROOT_POST, API_ROOT_GET} from "../../data/urls";
import {DisplayInfo} from "../../Util/DisplayWarning"

import "../../styles/ListingView.css";
import "../../styles/Listing.css";

const questionSuccessMessage = "Successfully created a new question"
const questionFailMessage = "Cannot create a question at this time"
const questionWarningMessage = "Server Error, please try to post a question later"
const commentSuccessMessage = "Successfully created a comment"
const commentFailMessage = "Cannot post a comment at this time"
const commentWarningMessage = "Server Error, please try to add a comment later"

class QnA extends Component {

  state = {
    questionMessage: false,
    questionSuccess: false,
    questionWarning: false,
    commentMessage: false,
    commentSuccess: false,
    commentWarning: false,
  }

  componentDidMount (){
    this.fetchQnAInfo(this.props.selectedListing.id)
  }

  componentDidUpdate (prevProps, prevState){
    if (prevProps.selectedListing.id !== this.props.selectedListing.id){
      this.fetchQnAInfo(this.props.selectedListing.id)
      this.clearFields()
    }
  }

  componentWillUnmount () {
    this.clearFields()
    this.resetStatus()
  }

  clearFields = () =>{
    this.props.setComments(new Map())
    this.props.setNewQuestion("")
  }

  resetStatus = () =>{
    this.setState({
      questionMessage: false,
      questionSuccess: false,
      questionWarning: false,
      commentMessage: false,
      commentSuccess: false,
      commentWarning: false,
    })
  }

  handleCloseQuestion = () =>{
    this.setState({
      questionMessage: false
    })
  }

  handleCloseComment = () =>{
    this.setState({
      commentMessage: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <DisplayInfo
          displayMessage = {this.state.questionMessage}
          displaySuccess = {this.state.questionSuccess}
          displayWarning = {this.state.questionWarning}
          successMessage = {questionSuccessMessage}
          failedMessage = {questionFailMessage}
          WarningMessage = {questionWarningMessage}
          handleCloseMessage = {this.handleCloseQuestion}
        />

        <DisplayInfo
          displayMessage = {this.state.commentMessage}
          displaySuccess = {this.state.commentSuccess}
          displayWarning = {this.state.commentWarning}
          successMessage = {commentSuccessMessage}
          failedMessage = {commentFailMessage}
          WarningMessage = {commentWarningMessage}
          handleCloseMessage = {this.handleCloseComment}
        />
        <div className="listingIconText" style={{marginTop:'10px', marginLeft: 10, paddingBottom:'20px', display: 'inline'}}>
          Questions and Answers:
          {this.displayQnAInfo()}
          <div style={{ marginTop: '10px', marginLeft: 10 }}>Didn't find your answer? Post a question!</div>
          <div style={{width:'60%'}}>
          <TextField 
            label="Add question" 
            variant="outlined" 
            size="small" 
            multiline
            style = {{
              marginRight: 20,
              marginLeft: 10
            }}
            inputProps={{ maxLength: 100 }}
            value = {this.props.newQuestion}
            onChange = {(event)=>{this.props.setNewQuestion(event.target.value)}}
          />
          <Button 
            style = {{
              width: 100,
              height: "100%",
              backgroundColor: "#f0c14b",
              color: "black",
              fontSize: 16,
              fontWeight: 600
            }}
            onClick = {(event)=>{
            this.handleCreateNewQuestion()
          }}>Create</Button>
          </div>
        </div>
      </React.Fragment>
    )

  } // end of render

  handleCreateNewQuestion = () =>{
    if (this.props.newQuestion !== ""){
      const url = API_ROOT_POST.concat(
        "listing/",
        this.props.selectedListing.id,
        "/chain"
      )
      const body = {
        comment: this.props.newQuestion
      }
      const config = {
        headers: { Authorization: `Bearer ${this.props.cookies.get("status")}` }
      };
      axios.post(url, body, config)
      .then(response=>{
        if (response.data.message === "Chain has been created successfully!"){
          this.setState({
            questionMessage: true,
            questionSuccess: true,
            questionWarning: false
          })
          this.fetchQnAInfo(this.props.selectedListing.id)
          this.props.setNewQuestion("")
        }
        else{
          this.setState({
            questionMessage: true,
            questionSuccess: false,
            questionWarning: false
          })
        }
      })
      .catch(error =>{
        this.setState({
          questionMessage: true,
          questionSuccess: false,
          questionWarning: true
        })
      })
    }
  }

  handleReply = (chainid) =>{
    const selectedComment = this.props.comments.get(chainid)
    if (selectedComment !== ""){
      const url = API_ROOT_POST.concat(
        "listing/",
        this.props.selectedListing.id,
        "/chain/",
        chainid,
        "/comment"
      )
      const body = {
        comment: selectedComment
      }
      const config = {
        headers: { Authorization: `Bearer ${this.props.cookies.get("status")}` }
      };
      axios.post(url, body, config)
      .then(response=>{
        if (response.data.message === "Comment has been created successfully!"){
          this.fetchQnAInfo(this.props.selectedListing.id)
          // If the comment was updated successfully, then clear the comments
          let newComment = _.cloneDeep(this.props.comments)
          newComment.set(chainid, "")
          this.setState({
            commentMessage: true,
            commentSuccess: true,
            commentWarning: false
          })
          this.props.setComments(newComment)
        }
        else{
          this.setState({
            commentMessage: true,
            commentSuccess: false,
            commentWarning: false
          })
        }
      })
      .catch(error=>{
        console.log(error)
        this.setState({
          commentMessage: true,
          commentSuccess: false,
          commentWarning: true
        })
      })
    }
  }

  displayQnAInfo = () =>{
    let result = []
    if (this.props.qnaInfo !== null && this.props.qnaInfo.size !== 0){
      for (let [chainid, question] of this.props.qnaInfo){
        result.push(
          <div className = "sectionPadding">
            <div className="questionQnA">Q: {question.questionBody}
            
                {this.displayQnAAnswer(question)}
                <div className = "detailListing-QnA-Comment-of-Questions">
                  <TextField 
                    key = {"newanswer".concat(chainid)}
                    className="replyField" 
                    label="Reply to thread" 
                    variant="outlined" 
                    size="small"
                    multiline
                    inputProps={{ maxLength: 100 }}
                    style = {{
                      marginRight: 20
                    }}
                    value = {this.props.comments.get(chainid) || ""}
                    onChange = {event =>{
                      this.updateComments(chainid, event.target.value)
                    }}
                  />
                  <Button 
                    style = {{
                      width: 50,
                      height: "100%",
                      backgroundColor: "#f0c14b",
                      color: "black",
                      fontSize: 16,
                      fontWeight: 600
                    }}
                    onClick = {()=>{
                      this.handleReply(chainid)
                    }}
                  >
                    Reply
                  </Button>
                </div>
              </div>
          </div>
        )
      }
    }
    return result
  }

  updateComments = (inputKey,commentValue) =>{
    let newComments = _.cloneDeep(this.props.comments)
    newComments.set(inputKey,commentValue)
    this.props.setComments(newComments)
  }

  displayQnAAnswer = (question) =>{
    let result = []
    for (let i = 0 ; i < question.replies.length; i++){
      result.push(
        <div className="answerQnA" style={{backgroundColor: (i % 2 === 0) ? '#EEEFFF' : '#white' }}>
          {(question.replies[i].userid === (this.props.selectedListing.userid).toString())
            ?
            <div className="landlordText">⭐landlord replied:</div>
            :
            <div className="userText">user replied:</div>
          }
          - {question.replies[i].content}
        </div>
      )
    }
    return result
  }

  fetchQnAInfo(listingId) {
    const url = String(API_ROOT_GET).concat("listing/" + listingId.toString() + "/comment")
    // let result = [];
    let result = new Map()
    axios.get(url)
    .then(response => {
      const comments = response.data
      comments.forEach(item =>{
        // if the chainid does not exist in the map, which stands for a new question
        if (!result.has(item.chainid)){
          let detail = {
            questionBody: item.comment,
            chainid: item.chainid,
            replies: []
          }
          result.set(item.chainid, detail)
        }
        // If the chainid already exists in the map, which means it's comment of an existing question
        else{
          let newDetail = _.cloneDeep(result.get(item.chainid))
          newDetail.replies.push({
            userid: item.userid,
            content: item.comment
          })
          result.set(item.chainid, newDetail)
        }
      })
      this.props.setQnAInfo(result)
    })
  }

}

//REDUX
const mapStateToProps = state => {
  return {
    selectedListing: state.listingDetail.selectedListing,
    cookies: state.homeContent.cookies,
    qnaInfo: state.listingDetail.qnaInfo,
    comments: state.listingDetail.comments,
    newQuestion: state.listingDetail.newQuestion,
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setQnAInfo,
    setComments,
    setNewQuestion
  }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(QnA);


