/**
./Data/loaded_data.js

loads the data for the application and provides methods for interacting and filtering the data
also allows for limited ability of dynamic quiz choice creation (overly terrible rn)

**/

//Models
import Collection from "../Models/Collection";

//util libs
import _ from "lodash";
import nlp from "compromise";

//load the collection data json in

//import * as loaded_collections from '../Data/collections.json'
//import * as loaded_collections from "../Data/Scraped/data.json";
import * as raw_loaded_collections from "./Dummy/data.json";
import * as dummy_loaded_collections from "./collections.json";

export const raw_collections = raw_loaded_collections;

//filters the raw collections data
let filtered_init_data = _.map(raw_collections, function(collection) {
  let filtered_items = _.filter(collection.items, function(item) {
    return item.description !== null;
  });

  return new Collection(collection.name, filtered_items);
});

//filtered data exported for use as loaded_collections
export const loaded_collections = filtered_init_data;

//version with dummy data spliced in

let mixed_loaded_collections = _.clone(loaded_collections);

_.map(dummy_loaded_collections, function(dummy_collection) {
  //get the collection name
  var collection_name = dummy_collection["name"];

  //get the titles of each of the collection items
  var collection_item_titles = _.map(dummy_collection.items, function(item) {
    return item.title;
  });

  //check if we have that collection
  var collection_there =
    _.filter(mixed_loaded_collections, function(collection) {
      return collection.name === collection_name;
    }).length > 0;

  // if not there add a new collection
  if (collection_there !== true) {
    mixed_loaded_collections.push({
      name: collection_name,
      items: dummy_collection.items
    });
  } else {
    // if it is there, merge with the existing collection
    mixed_loaded_collections = _.map(mixed_loaded_collections, function(
      collection
    ) {
      let cloned_collection = _.clone(collection);

      if (cloned_collection["name"] === collection_name) {
        cloned_collection.items = _.concat(
          _.filter(cloned_collection.items, function(item) {
            for (var i = 0; i < collection_item_titles.length; i++) {
              let title = collection_item_titles[i];

              if (item.title === title) {
                return false;
              }
            }

            return true;
          }),
          dummy_collection.items
        );
      }

      return cloned_collection;
    });
  }
});

export const loaded_collections_with_dummy = mixed_loaded_collections;

/**
  retrieve_potential_quiz_choices(collections, size)

  collections: collections to pull quiz choices from
  size: amount of quiz choices to return

  generates potential quiz choices with natural language processing
**/

export const retrieve_potential_quiz_choices = (collections, size = null) => {
  let quiz_options = [];
  let option_count = 0;

  let all_items = [];

  _.map(collections, function(collection) {
    all_items = _.concat(all_items, collection.items);
  });

  //might slow down under heavy load
  all_items = _.shuffle(all_items);

  _.map(all_items, function(item) {
    let description = item.description;

    let nouns = nlp(description)
      .nouns()
      .data();

    let nouns_text = _.map(nouns, function(noun) {
      if (size !== null) {
        if (option_count >= size) {
          return quiz_options;
        }
      }

      let noun_text = noun.text;

      if (noun_text[0] == " ") {
        console.log("no");

        let split_text = noun_text.split("");
        split_text.shift();

        noun_text = split_text.join("");
      }

      option_count += 1;
      quiz_options.push(noun_text);
    });
  });

  return quiz_options;
};
