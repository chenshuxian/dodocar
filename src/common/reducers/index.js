import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';
import exam from './ui/examReducers';
import recipe from './data/recipeReducers';
import user from './data/userReducers';
import car from './data/carReducers';
import { reducer as formReducer } from 'redux-form'
// import routes from './routes';

const rootReducer = combineReducers({
  ui,
  recipe,
  user,
  exam,
  car,
  form: formReducer
});

export default rootReducer;
