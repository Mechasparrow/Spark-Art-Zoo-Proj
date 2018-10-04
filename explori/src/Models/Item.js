/*
Item.js

Creates the Item model. Contains the image and description of an item

*/

//util lib
import _ from 'lodash';

class Item {

  //constructs the object
  constructor(title, description, author, image_link, type=null, completed = null) {

    this.title = title;
    this.author = author;
    this.image_link = image_link;
    this.description = description;
    this.type = type;
    this.completed = completed;

  }

  //serializes the object to JSON
  serialize() {

    let {title, description, author, image_link, type, completed} = this;

    return {
      title, description, author, image_link, type, completed
    }

  }

  //parses the raw Item from JSON
  static parse(raw_item) {

    let {title, description, author, image_link, type} = raw_item;

    var completed = false;

    return new Item(title, description, author, image_link, type, completed);

  }

  //parse raw Item from JSON with completion
  static parseWithComplete(raw_item) {

    let {title, description, author, image_link, type, completed} = raw_item;

    return new Item(title, description, author, image_link, type, completed);

  }

  //parses the a list of raw Items from JSON
  static parseList(raw_items) {

    let parsed_items = _.map(raw_items, function (raw_item) {

      if (raw_item['completed'] !== undefined) {
        return Item.parseWithComplete(raw_item);
      }else {
        return Item.parse(raw_item);
      }

    })

    return parsed_items;

  }

}

export default Item;
