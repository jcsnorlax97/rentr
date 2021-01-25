export const setPrice = (inputInt) => {
  return {
    type: "SET_PRICE",
    payload: inputInt
  }
}

export const setBedRoom = (inputInt) => {
  return {
    type: "SET_BEDROOM",
    payload: inputInt
  }
}

export const setWashRoom = (inputInt) => {
  return {
    type: "SET_WASHROOM",
    payload: inputInt
  }
}

export const setLaundryRoom = (inputInt) => {
  return {
    type: "SET_LAUNDRYROOM",
    payload: inputInt
  }
}

export const setDescription = (inputString) =>{
  return {
    type: "SET_DESCRIPTION",
    payload: inputString
  }
}

export const setImage = (inputString) =>{
  return {
    type: "SET_IMAGE",
    payload: inputString
  }
}