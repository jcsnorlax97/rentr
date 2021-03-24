import { combineReducers } from "redux";
//import all the reducers in the files:
import { listingDetailReducer } from "../reducers/ListingDetail";
import { homeReducer } from "../reducers/HomePage";
import { createListingReducer } from "../reducers/CreateListing";
import {profile} from "../reducers/Profile";

const allReducers = combineReducers({
  listingDetail: listingDetailReducer,
  homeContent: homeReducer,
  createListingContent: createListingReducer,
  profile,
});

export default allReducers;
