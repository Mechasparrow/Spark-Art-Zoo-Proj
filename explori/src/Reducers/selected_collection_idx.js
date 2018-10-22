/**
./Reducers/selected_collection_idx

reducer that stores the index of the selected collection;

**/

import { SELECT_COLLECTION, CLEAR_COLLECTION_SELECTION } from "../Constants";

export const selected_collection_idx = (state = null, action) => {
  switch (action.type) {
    //selects the collection with idx
    case SELECT_COLLECTION:
      let { collection_idx } = action.payload;
      return collection_idx;
    case CLEAR_COLLECTION_SELECTION:
      return null;
    default:
      return state;
  }
};
