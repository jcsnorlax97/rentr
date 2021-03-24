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