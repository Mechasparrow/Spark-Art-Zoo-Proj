import {combineReducers} from 'redux';

import {collections} from './collections';
import {selected_collection_idx} from './selected_collection_idx';

export const rootReducer = combineReducers({
  collections,
  selected_collection_idx
});
