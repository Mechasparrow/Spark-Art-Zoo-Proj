import {TEST, SELECT_COLLECTION} from '../Constants';

export const test = () => ({
  type: TEST
})

export const select_collection = (collection_idx) => ({
  type: SELECT_COLLECTION,
  payload: {
    collection_idx
  }
})
