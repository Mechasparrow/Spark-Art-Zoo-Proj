/**
./Reducers/collections.js

redux reducer that stores collection data

**/

//redux constants
import { COMPLETE_ITEM } from "../Constants";

//Models
import Collection from "../Models/Collection";

//Util Lib
import _ from "lodash";

//Initial Data

import { loaded_collections_with_dummy as loaded_collections } from "../Data/loaded_data";

export const collections = (
  state = Collection.parseList(loaded_collections),
  action
) => {
  switch (action.type) {
    case COMPLETE_ITEM:
      console.log("COMPLET ITEM");
      let { complete_item_idx, complete_collection_idx } = action.payload;

      let serialized_copy = _.clone(Collection.serializeList(state));
      console.log(serialized_copy);

      serialized_copy[complete_collection_idx].items[
        complete_item_idx
      ].completed = true;

      return Collection.parseList(serialized_copy);

    default:
      return state;
  }
};
