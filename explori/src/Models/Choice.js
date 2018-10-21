/**
Choice.js

Creates a class called Choice

It is a choice for an item

**/

//util lib
import _ from "lodash";

class Choice {
  //initialize with the name and Items of the collection
  constructor(id, item, text, correct) {
    this.id = id;
    this.item = item;
    this.text = text;
    this.correct = correct;
  }

  // serializes a collection into raw form (JSON)
  serialize() {
    let { id, item, text, correct } = this;

    return {
      id,
      item,
      text,
      correct
    };
  }

  static serializeList(choice_list) {
    let serialized_list = _.map(choice_list, function(choice) {
      return choice.serialize();
    });

    return serialized_list;
  }

  // parses a raw choice (JSON)
  static parse(raw_choice) {
    let { id, item, text, correct } = raw_choice;

    return new Choice(id, item, text, correct);
  }

  //parses a list of raw choices (JSON)
  static parseList(raw_choices) {
    let parsed_choices = _.map(raw_choices, function(raw_choice) {
      return Choice.parse(raw_choice);
    });

    return parsed_choices;
  }
}

export default Choice;
