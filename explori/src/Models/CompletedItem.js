// ./Models/CompletedItem.js
// Points to item that has been completed

//root model
import Model from "./Model";

class CompletedItem extends Model {
  constructor(item_id) {
    super({
      item_id
    });
  }

  //parsers
  static parse(raw_completed_item) {
    return Model.parse(raw_completed_item, CompletedItem);
  }

  static parseList(raw_completed_items) {
    return Model.parseList(raw_completed_items, CompletedItem);
  }
}

export default CompletedItem;
