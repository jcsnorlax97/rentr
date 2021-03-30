export const setListingArray = (inputArr) => {
  return {
    type: "SET_LISTING_ARRAY",
    payload: inputArr
  }
}

export const setPageNum = (inputInt) => {
  return {
    type: "SET_PAGENUM",
    payload: inputInt
  }
}

export const setNumPerPage = (inputInt) => {
  return {
    type: "SET_NUMPERPAGE",
    payload: inputInt
  }
}

export const setListingDetail = (inputObj) =>{
  return{
    type: "EXHIBIT_LISTING_DETAIL",
    payload: inputObj
  }
}

export const setReadOnly = (inputBool) =>{
  return{
    type: "SET_READONLY",
    payload: inputBool
  }
}

export const setQnAInfo = (inputObj) =>{
  return{
    type: "SETQNA_INFO",
    payload: inputObj
  }
}

export const setComments = (inputObj) =>{
  return{
    type: "SET_COMMENTS",
    payload: inputObj
  }
}

export const setNewQuestion = (inputObj) =>{
  return{
    type: "SET_NEWQUESTION",
    payload: inputObj
  }
}