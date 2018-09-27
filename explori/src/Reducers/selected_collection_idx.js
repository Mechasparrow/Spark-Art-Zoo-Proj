
import {
  SELECT_COLLECTION
} from '../Constants';

export const selected_collection_idx = (state = 0, action) => {

  switch (action.type) {

      case SELECT_COLLECTION:
        let {collection_idx} = action.payload;
        return collection_idx;
      default:
        return state;
  }

}
