export const setTitle = (inputString) => {
    return {
        type: "SET_TITLE",
        payload: inputString
    }
}

export const setDescription = (inputString) => {
    return {
        type: "SET_DESCRIPTION",
        payload: inputString
    }
}

export const setNumberOfBedrooms = (inputString) => {
    return {
        type: "SET_NUMBER_OF_BEDROOMS",
        payload: inputString
    }
}

export const setNumberOfBathrooms = (inputString) => {
    return {
        type: "SET_NUMBER_OF_BATHROOMS",
        payload: inputString
    }
}

export const setPrice = (inputString) => {
    return {
        type: "SET_PRICE",
        payload: inputString
    }
}
export const setLaundry = (inputString) => {
    return {
        type: "SET_LAUNDRY",
        payload: inputString
    }
}
export const setPetsAllowed = (inputString) => {
    return {
        type: "SET_PETS_ALLOWED",
        payload: inputString
    }
}
export const setParking = (inputString) => {
    return {
        type: "SET_PARKING",
        payload: inputString
    }
}

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

export const resetImages = () =>{
    return {
        type: "RESET_IMAGES"
    }
}

export const setCreatingListing = (inputBool) =>{
    return{
        type: "SET_CREATING_LISTING",
        payload: inputBool
    }
}