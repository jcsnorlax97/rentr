import { combineReducers } from "redux";
//import all the reducers in the files:
import { listingDetailReducer } from "../reducers/ListingDetail";
import { homeReducer } from "../reducers/Home";
import { createListingReducer } from "../reducers/CreateListing";

const allReducers = combineReducers({
  listingDetail: listingDetailReducer,
  homeContent: homeReducer,
  createListingContent: createListingReducer,
});

export default allReducers;
