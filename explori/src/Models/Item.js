/*
Item.js

Creates the Item model. Contains the image and description of an item

*/

//util lib
import _ from 'lodash';

class Item {

  //constructs the object
  constructor(image_link, description) {

    this.image_link = image_link;
    this.description = description;

  }

  //serializes the object to JSON
  serialize() {

    let {image_link, description} = this;

    return {
      image_link,
      description
    }

  }

  //parses the raw Item from JSON
  static parse(raw_item) {

    let {image_link, description} = raw_item;

    return new Item(image_link, description);

  }

  //parses the a list of raw Items from JSON
  static parseList(raw_items) {

    let parsed_items = _.map(raw_items, function (raw_item) {
      return Item.parse(raw_item);
    })

    return parsed_items;

  }

}

export default Item;
