import { SELECT_ITEM } from "../Constants";

export const selected_item_idx = (state = null, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      let { selected_item_idx } = action.payload;

      return selected_item_idx;

    default:
      return state;
  }
};
