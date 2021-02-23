export const setTitle = (inputString) => {
    return {
        type: "SET_TITLE",
        payload: inputString
    }
}

export const setDialogOpen = (inputBool) => {
    return {
        type: "SET_DIALOG_OPEN",
        payload: inputBool
    }
}
