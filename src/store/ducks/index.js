import { combineReducers } from 'redux';

import places from './places';
import place from './place';
import tours from './tours';

export default combineReducers({
  places,
  place,
  tours,
});
