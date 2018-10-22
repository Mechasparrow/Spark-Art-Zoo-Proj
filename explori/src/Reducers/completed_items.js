/**
./Reducers/completed_items.js

redux reducers for items that have been completed

**/

//redux action constants
import { COMPLETE_ITEM } from "../Constants";

//CompletedItem model
import CompletedItem from "../Models/CompletedItem";

//util libs
import _ from "lodash";

export const completed_items = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_ITEM:
      let { completed_item_idx } = action.payload;

      return _.concat(state, new CompletedItem(completed_item_idx));

    default:
      return state;
  }
};
