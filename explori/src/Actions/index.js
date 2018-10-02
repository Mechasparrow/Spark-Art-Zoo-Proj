/**
./Actions/index.js
a.k.a ./Actions

root script that defines the possible redux actions that are available

**/

//Import all the necessary redux constants
import {
  TEST,
  SELECT_COLLECTION,
  SELECT_ITEM,
  CLEAR_ITEM_SELECTION,
  INCREMENT_SCORE
} from "../Constants";

//test action for DEBUG
export const test = () => ({
  type: TEST
});

//actions for selection

export const select_collection = collection_idx => ({
  type: SELECT_COLLECTION,
  payload: {
    collection_idx
  }
});

export const select_item = selected_item_idx => ({
  type: SELECT_ITEM,
  payload: {
    selected_item_idx
  }
});

//actions to clear selections

export const clear_item_selection = () => ({
  type: CLEAR_ITEM_SELECTION
});

//score actions
export const incrementScore = () => ({
  type: INCREMENT_SCORE
});
