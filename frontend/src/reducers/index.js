import { combineReducers } from "redux";
//import all the reducers in the files:
import { listingDetailReducer } from "../reducers/ListingDetail";
import { homeReducer} from "../reducers/Home";

const allReducers = combineReducers({
  listingDetail: listingDetailReducer,
  homeContent: homeReducer,
});

export default allReducers;
