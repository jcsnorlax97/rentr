export const setDialogStatus = (inputBool) => {
  return {
    type: "SET_DIALOG_OPEN",
    payload: inputBool
  }
}

export const setListingArray = (inputArr) => {
  return {
    type: "SET_PROFILE_LISTING_ARRAY",
    payload: inputArr
  }
}