import {
  TEST,
  SELECT_COLLECTION,
  SELECT_ITEM,
  CLEAR_ITEM_SELECTION,
  INCREMENT_SCORE
} from "../Constants";

export const test = () => ({
  type: TEST
});

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

export const clear_item_selection = () => ({
  type: CLEAR_ITEM_SELECTION
});

//score actions
export const incrementScore = () => ({
  type: INCREMENT_SCORE
});
