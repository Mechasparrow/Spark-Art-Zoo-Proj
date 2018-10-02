/**
./Reducers/selected_item_idx

redux reducer that stores the index of the selected item

**/

import { SELECT_ITEM, CLEAR_ITEM_SELECTION } from "../Constants";

export const selected_item_idx = (state = null, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      let { selected_item_idx } = action.payload;

      return selected_item_idx;
    case CLEAR_ITEM_SELECTION:
      return null;
    default:
      return state;
  }
};
