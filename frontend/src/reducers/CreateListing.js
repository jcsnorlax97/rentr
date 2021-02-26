const initialState = {
    dialogOpen: false,
    images:[],
    creatingListing: false
}

export const createListingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DIALOG_OPEN":
            return { ...state, dialogOpen: action.payload };
        case "SET_IMAGES":
            return { ...state, images: action.payload };
        case "SET_CREATING_LISTING":
            return {...state, creatingListing: action.payload};
        default:
            return state;
    }
}