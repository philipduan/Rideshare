import { combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer //Is something that we need for our redux-form to work
});

export default rootReducer;
