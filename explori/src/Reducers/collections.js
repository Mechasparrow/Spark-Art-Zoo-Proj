/**
./Reducers/collections.js

redux reducer that stores collection data

**/

//Models
import Collection from "../Models/Collection";

//Util Lib
import _ from "lodash";

//Initial Data

import { loaded_collections } from "../Data/loaded_data";

export const collections = (state = loaded_collections, action) => {
  return state;
};
