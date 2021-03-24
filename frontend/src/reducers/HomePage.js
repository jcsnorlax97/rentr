import Cookies from "universal-cookie"

const initialState = {
  userEmail: "",
  logging: false,
  registering: false,
  loginDialogOpen: false,
  registerDialogOpen: false,
  status: false,
  cookies: new Cookies(),
  searchFieldError: false,
  searchFieldValue: "",
  searchCategory: ""
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
      if (action.payload.status === true){
        state.cookies.set("status", action.payload.token, { expires: 0, path:'/' })
      }
      else if (action.payload.status === false){
        state.cookies.remove("status")
      }
      return {...state, status: action.payload.status};
    // case "SET_TOKEN":
    //   return {...state, token: action.payload};
    case "SET_SEARCH_ERROR":
      return {...state, searchFieldError: action.payload};
    case "SET_SEARCH_VALUE":
      return {...state, searchFieldValue: action.payload};
    case "SET_SEARCH_CATEGORY":
      return {...state, searchCategory: action.payload};
    default: 
			return state;
  }
}