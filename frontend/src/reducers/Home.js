const initialState = {
  loginEmail: "",
  loginPassword:"",
  registerEmail: "",
  registerPassword: "",
  registerPassword_second: "",
  loginDialogOpen: false,
  registerDialogOpen: false,
}

export const homeReducer = (state = initialState, action) => {
  switch(action.type){
    case "SET_LOGIN_EMAIL":
      return {...state, loginEmail: action.payload};
    case "SET_LOGIN_PASSWORD":
      return {...state, loginPassword: action.payload};
    case "SET_REGISTER_EMAIL":
      return {...state, registerEmail: action.payload};
    case "SET_REGISTER_PASSWORD":
      return {...state, registerPassword: action.payload};
    case "SET_REGISTER_PASSWORD_SECOND":
      return {...state, registerPassword_second: action.payload};
    case "SET_LOGIN_DIALOG":
      return {...state, loginDialogOpen: action.payload};
    case "SET_REGISTER_DIALOG":
      return {...state, registerDialogOpen: action.payload};
    default: 
			return state;
  }
}