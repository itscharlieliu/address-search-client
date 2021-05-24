import { applyMiddleware, CombinedState, createStore, Store } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

import ApplicationState from ".";

function configureStore(): Store<CombinedState<ApplicationState>> {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;
