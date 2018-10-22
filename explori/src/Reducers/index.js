/**
./Reducers/index.js

root script for the redux reducer. This combines all other reducers

**/

import { combineReducers } from "redux";

import { selected_collection_idx } from "./selected_collection_idx";
import { selected_item_idx } from "./selected_item_idx";
import { quiz_options } from "./quiz_options";
import { completed_items } from "./completed_items";
import { score } from "./score";
import {selected_source_id} from './selected_source_id';

export const rootReducer = combineReducers({
  selected_collection_idx,
  selected_item_idx,
  selected_source_id,
  quiz_options,
  completed_items,
  score
});
