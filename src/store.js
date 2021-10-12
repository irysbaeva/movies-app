import reducer from "./reducer";
import { createStore, compose, applyMiddleware } from "redux";

import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancer(applyMiddleware(thunk));

const store = createStore(reducer, middleware);
export default store;
