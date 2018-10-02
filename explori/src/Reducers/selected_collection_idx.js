/**
./Reducers/selected_collection_idx

reducer that stores the index of the selected collection;

**/

import {
  SELECT_COLLECTION
} from '../Constants';

export const selected_collection_idx = (state = 0, action) => {

  switch (action.type) {

      //selects the collection with idx
      case SELECT_COLLECTION:
        let {collection_idx} = action.payload;
        return collection_idx;
      default:
        return state;
  }

}
