import { combineReducers } from "redux";

import searchReducer from "./search/SearchReducer";

import ApplicationState from ".";

const rootReducer = combineReducers<ApplicationState>({
    search: searchReducer,
});

export default rootReducer;
