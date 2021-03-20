export const setStatus = (inputBool) =>{
  return {
    type: "SET_STATUS",
    payload: inputBool
  }
}

export const setToken = (inputString) =>{
  return {
    type: "SET_TOKEN",
    payload: inputString
  }
}
