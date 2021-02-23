const initialState = {
    title: "",
    dialogOpen: false
}

export const createListingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TITLE":
            return { ...state, title: action.payload };
        case "SET_DIALOG_OPEN":
            return { ...state, dialogOpen: action.payload };
        default:
            return state;
    }
}