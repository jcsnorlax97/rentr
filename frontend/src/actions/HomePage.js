export const setStatus = (inputObj) =>{
  return {
    type: "SET_STATUS",
    payload: inputObj
  }
}

export const setLogging = (inputString) => {
  return {
    type: "SET_LOGGING",
    payload: inputString
  }
}

export const setRegistering = (inputString) => {
  return {
    type: "SET_REGISTERING",
    payload: inputString
  }
}

export const setUserEmail = (inputString) => {
  return {
    type: "SET_USER_EMAIL",
    payload: inputString
  }
}


export const setLogin_dialog = (inputBool) =>{
  return {
    type: "SET_LOGIN_DIALOG",
    payload: inputBool
  }
}

export const setRegister_dialog = (inputBool) =>{
  return {
    type: "SET_REGISTER_DIALOG",
    payload: inputBool
  }
}

export const setSearchError = (inputBool) =>{
  return {
    type: "SET_SEARCH_ERROR",
    payload: inputBool
  }
}

export const setSearchValue = (inputString) =>{
  return {
    type: "SET_SEARCH_VALUE",
    payload: inputString
  }
}

export const setSearchCategory = (inputString) =>{
  return {
    type: "SET_SEARCH_CATEGORY",
    payload: inputString
  }
}