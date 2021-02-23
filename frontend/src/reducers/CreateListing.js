const initialState = {
    title: "",
    description: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    dialogOpen: false
}

export const createListingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TITLE":
            return { ...state, title: action.payload };
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload };
        case "SET_NUMBER_OF_BEDROOMS":
            return { ...state, numberOfBedrooms: action.payload };
        case "SET_NUMBER_OF_BATHROOMS":
            return { ...state, numberOfBathrooms: action.payload };
        case "SET_DIALOG_OPEN":
            return { ...state, dialogOpen: action.payload };
        default:
            return state;
    }
}