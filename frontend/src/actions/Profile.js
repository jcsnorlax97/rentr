export const setPersonalDialogStatus = (inputBool) => {
  return {
    type: "SET_DIALOG_STATUS",
    payload: inputBool
  }
}

export const setPersonalListingArray = (inputArr) => {
  return {
    type: "SET_PROFILE_LISTING_ARRAY",
    payload: inputArr
  }
}