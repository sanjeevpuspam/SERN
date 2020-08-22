import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from '../reducers/index';

const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const { createLogger } = require("redux-logger");

const middlewares = [reduxThunk];

if (process.env.NODE_ENV === "development") {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export default createStore( reducers, composeEnhancers(applyMiddleware(...middlewares)));










