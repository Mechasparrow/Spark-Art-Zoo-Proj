//load the json in
//import * as loaded_collections from '../Data/collections.json'
//import * as loaded_collections from "../Data/Scraped/data.json";
import * as raw_loaded_collections from "../Data/Dummy/data.json";

//Models
import Collection from "../Models/Collection";

//util libs
import _ from "lodash";
import nlp from "compromise";

export const raw_collections = raw_loaded_collections;

//filters data for items that do not have descriptions
let filtered_init_data = _.map(raw_loaded_collections, function(collection) {
  let filtered_items = _.filter(collection.items, function(item) {
    return item.description !== null;
  });

  return new Collection(collection.name, filtered_items);
});

export const loaded_collections = filtered_init_data;

// generates potential quiz choices with natural language processing
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
