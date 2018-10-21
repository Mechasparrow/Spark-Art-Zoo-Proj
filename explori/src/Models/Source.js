// ./Models/Source.js
// JavaScript version of the Django Source Model
// Source of the collections

//root model
import Model from "./Model";

class Source extends Model {
  constructor(id, name) {
    super({
      id,
      name
    });
  }

  //parser
  static parse(raw_source) {
    return Model.parse(raw_source, Source);
  }

  //parse multiple sources
  static parseList(raw_sources) {
    return Model.parseList(raw_sources, Source);
  }
}

export default Source;
