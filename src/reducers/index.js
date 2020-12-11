import recordReducer from "../reducers/Records";
import { combineReducers } from "redux";

const rootReducers = combineReducers({ record: recordReducer });

export default rootReducers;