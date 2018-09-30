//Models
import Collection from "../Models/Collection";

//Initial Data

//import * as loaded_collections from '../Data/collections.json'
import * as loaded_collections from "../Data/Scraped/data.json";

//parse raw data
const col_init_data = Collection.parseList(loaded_collections);

export const collections = (state = col_init_data, action) => {
  return state;
};
