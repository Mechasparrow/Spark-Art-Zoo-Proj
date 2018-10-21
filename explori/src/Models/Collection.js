/**
Collection.js

Creates a class called Collection

It is a collection of items

**/

//util lib
import _ from "lodash";

//root model
import Model from "./Model";

//Import extra models
import Item from "./Item";

class Collection extends Model {
  //initialize with the name and Items of the collection
  constructor(id, source, name, items) {
    super({
      id,
      source,
      name,
      items
    });
  }

  static parse(raw_collection) {
    let pre_parse = _.assign(raw_collection, {
      items: Item.parseList(raw_collection.items)
    });

    return Model.parse(pre_parse, Collection);
  }

  static parseList(raw_collections) {
    console.log(raw_collections);

    let pre_parse = _.map(raw_collections, function(raw_collection) {
      return _.assign(raw_collection, {
        items: Item.parseList(raw_collection.items)
      });
    });

    return Model.parseList(pre_parse, Collection);
  }
}

export default Collection;
