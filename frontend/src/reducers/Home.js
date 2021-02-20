const initialState = {
  userEmail: "",
  logging: false,
  registering: false,
  loginDialogOpen: false,
  registerDialogOpen: false,
  status: false
}

export const homeReducer = (state = initialState, action) => {
  switch(action.type){
    case "SET_USER_EMAIL":
      return {...state, userEmail: action.payload};
    case "SET_LOGGING":
      return {...state, logging: action.payload};
    case "SET_REGISTERING":
      return {...state, registering: action.payload};
    case "SET_LOGIN_DIALOG":
      return {...state, loginDialogOpen: action.payload};
    case "SET_REGISTER_DIALOG":
      return {...state, registerDialogOpen: action.payload};
    case "SET_STATUS":
      return {...state, status: action.payload};
    default: 
			return state;
  }
}