import { combineReducers } from "redux";

import { collections } from "./collections";
import { selected_collection_idx } from "./selected_collection_idx";
import { selected_item_idx } from "./selected_item_idx";
import { quiz_options } from "./quiz_options";
import {score} from './score';

export const rootReducer = combineReducers({
  collections,
  selected_collection_idx,
  selected_item_idx,
  quiz_options,
  score
});
