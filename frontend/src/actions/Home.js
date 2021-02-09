export const setLogin_email = (inputString) => {
  return {
    type: "SET_LOGIN_EMAIL",
    payload: inputString
  }
}

export const setLogin_password = (inputString) => {
  return {
    type: "SET_LOGIN_PASSWORD",
    payload: inputString
  }
}

export const setRegister_email = (inputString) => {
  return {
    type: "SET_REGISTER_EMAIL",
    payload: inputString
  }
}

export const setRegister_password = (inputString) => {
  return {
    type: "SET_REGISTER_PASSWORD",
    payload: inputString
  }
}

export const set_secondRegister_password = (inputString) => {
  return {
    type: "SET_REGISTER_PASSWORD_SECOND",
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
