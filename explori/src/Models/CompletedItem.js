// ./Models/CompletedItem.js
// Points to item that has been completed

class CompletedItem {
  constructor(item_id) {
    this.item_id = item_id;
  }

  //parser
  static parse(raw_completed_item) {
    let { item_id } = raw_completed_item;

    return new CompletedItem(item_id);
  }

  //serializer
  serialize() {
    let { item_id } = this;
    return {
      item_id
    };
  }
}

export default CompletedItem;
