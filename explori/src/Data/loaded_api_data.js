/**
loads data from the api and performs some data ops on it.

**/

//import the api
import ApiInterface from "../Lib/ApiInterface";

//util libs
import _ from "lodash";
import nlp from "compromise";

//import the models
import Choice from "../Models/Choice";
import Item from "../Models/Item";

export const generate_potential_quiz_options = (size = null) => {
  return new Promise((resolve, reject) => {
    let quiz_options = [];

    ApiInterface.getItems()
      .then(items => {
        let shuffled_items = _.shuffle(items);

        let quiz_options = [];

        //iterate through all the items
        _.map(shuffled_items, function(item) {
          //retrive the description
          let desc = item.description;

          //retrieve the nouns of the description
          let nouns = nlp(desc)
            .nouns()
            .data();

          // take each noun and have it be a potential quiz option
          _.map(nouns, function(noun) {
            if (size !== null) {
              if (quiz_options.length >= size) {
                resolve(quiz_options);
                return;
              }
            }

            let noun_text = noun.text;

            //remove unneccesary whitespace
            if (noun_text[0] == " ") {
              //remove the pesky spaces
              let split_text = noun_text.split("");
              split_text.shift();

              noun_text = split_text.join("");
            }

            //push the quiz option to the list
            quiz_options.push(noun_text);
          });
        });

        //resolve the quiz options for use
        resolve(quiz_options);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
