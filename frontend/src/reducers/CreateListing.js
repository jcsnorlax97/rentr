const initialState = {
    title: "",
    description: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    price: "",
    laundry: false,
    petsAllowed: false,
    parking: false,
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
        case "SET_PRICE":
            return { ...state, price: action.payload };
        case "SET_LAUNDRY":
            return { ...state, laundry: action.payload };
        case "SET_PETS_ALLOWED":
            return { ...state, petsAllowed: action.payload };
        case "SET_PARKING":
            return { ...state, parking: action.payload };
        case "SET_DIALOG_OPEN":
            return { ...state, dialogOpen: action.payload };
        default:
            return state;
    }
}