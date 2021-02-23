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

export const setDialogOpen = (inputBool) => {
    return {
        type: "SET_DIALOG_OPEN",
        payload: inputBool
    }
}
