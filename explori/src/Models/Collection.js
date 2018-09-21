
/** Collection Model
name:string
item_count: number
**/

class Collection {

  constructor(name, item_count) {
    this.name = name;
    this.item_count = item_count;
  }

  // serializes a collection into raw form (JSON)
  serialize() {
    let {name, item_count} = this;

    return {
      name,
      item_count
    }
  }

  // parses a raw collection (JSON)
  static parse(raw_collection) {
    let {name, item_count} = raw_collection;
    return new Collection (name, item_count);
  }

  //parses a list of raw collections (JSON)
  static parseList(raw_collections) {

  }

}

export default Collection;
