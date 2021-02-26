export const setDialogOpen = (inputBool) => {
    return {
        type: "SET_DIALOG_OPEN",
        payload: inputBool
    }
}

export const setImages = (inputArray) =>{
    return{
        type: "SET_IMAGES",
        payload: inputArray
    }
}

export const setCreatingListing = (inputBool) =>{
    return{
        type: "SET_CREATING_LISTING",
        payload: inputBool
    }
}