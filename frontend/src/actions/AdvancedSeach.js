export const setAdvSearchDialog = (inputBool) =>{
  return{
    type: "SET_ADVANCEDSEARCH_DIALOG",
    payload: inputBool
  }
}

export const setAdvancedSearching = (inputBool) =>{
  return{
    type: "SET_ADVANCEDSEARCH_INPROGRESS",
    payload: inputBool
  }
}