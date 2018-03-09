import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer.js';

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
