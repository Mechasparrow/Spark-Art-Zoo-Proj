/*
Item.js

Creates the Item model. Contains the image and description of an item

*/

//root model
import Model from "./Model";

//util lib
import _ from "lodash";
import uid from "uid";

class Item extends Model {
  //constructs the object
  constructor(
    id = uid(),
    collection,
    title,
    description,
    author,
    image_link,
    type = null,
    completed = null,
    selected_text = null,
    extra_options = null
  ) {
    super({
      id,
      collection,
      title,
      description,
      author,
      image_link,
      type,
      completed,
      selected_text,
      extra_options
    });
  }

  static parse(raw_item) {
    return Model.parse(raw_item, Item);
  }

  static parseList(raw_items) {
    return Model.parseList(raw_items, Item);
  }
}

export default Item;
