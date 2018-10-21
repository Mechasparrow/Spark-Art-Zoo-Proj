/**
Choice.js

Creates a class called Choice

It is a choice for an item

**/

//root model
import Model from "./Model";

class Choice extends Model {
  //initialize with the name and Items of the collection
  constructor(id, item, text, correct) {
    super({
      id,
      item,
      text,
      correct
    });
  }

  // parses a raw choice (JSON)
  static parse(raw_choice) {
    return Model.parse(raw_choice, Choice);
  }

  //parses a list of raw choices (JSON)
  static parseList(raw_choices) {
    return Model.parseList(raw_choices, Choice);
  }
}

export default Choice;
