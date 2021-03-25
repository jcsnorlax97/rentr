import { combineReducers } from "redux";
//import all the reducers in the files:
import { listingDetailReducer } from "../reducers/ListingDetail";
import { homeReducer } from "../reducers/HomePage";
import { createListingReducer } from "../reducers/CreateListing";
import {profile} from "../reducers/Profile";
import {advancedSearch} from "../reducers/AdvancedSearch";

const allReducers = combineReducers({
  listingDetail: listingDetailReducer,
  homeContent: homeReducer,
  createListingContent: createListingReducer,
  profile,
  advancedSearch,
});

export default allReducers;
