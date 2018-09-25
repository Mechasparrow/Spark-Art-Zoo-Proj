/*
Item.js

Creates the Item model. Contains the image and description of an item

*/

//util lib
import _ from 'lodash';

class Item {

  //constructs the object
  constructor(title, description, author, image_link, type=null) {

    this.title = title;
    this.author = author;
    this.image_link = image_link;
    this.description = description;
    this.type = type;

  }

  //serializes the object to JSON
  serialize() {

    let {title, description, author, image_link, type} = this;

    return {
      title, description, author, image_link, type
    }

  }

  //parses the raw Item from JSON
  static parse(raw_item) {

    let {title, description, author, image_link, type} = raw_item;

    return new Item(title, description, author, image_link, type);

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
