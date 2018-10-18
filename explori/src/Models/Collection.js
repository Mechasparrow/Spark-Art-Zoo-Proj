/**
Collection.js

Creates a class called Collection

It is a collection of items

**/

//util lib
import _ from "lodash";

//Import extra models
import Item from "./Item";

class Collection {
  //initialize with the name and Items of the collection
  constructor(id, source, name, items) {
    this.id = id;
    this.source = source;
    this.name = name;
    this.items = items;
  }

  // serializes a collection into raw form (JSON)
  serialize() {
    let { id, source, name, items } = this;

    let serialized_items = _.map(items, function(item) {
      return item.serialize();
    });

    return {
      name,
      items: serialized_items
    };
  }

  static serializeList(collection_list) {
    let serialized_list = _.map(collection_list, function(collection) {
      return collection.serialize();
    });

    return serialized_list;
  }

  // parses a raw collection (JSON)
  static parse(raw_collection) {
    let { id, source, name, items } = raw_collection;

    let parsed_items = Item.parseList(items);

    return new Collection(id, source, name, parsed_items);
  }

  //parses a list of raw collections (JSON)
  static parseList(raw_collections) {
    let parsed_collections = _.map(raw_collections, function(raw_collection) {
      return Collection.parse(raw_collection);
    });

    return parsed_collections;
  }
}

export default Collection;
