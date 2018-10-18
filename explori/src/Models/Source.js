// ./Models/Source.js
// JavaScript version of the Django Source Model
// Source of the collections

//libs
import _ from "lodash";

class Source {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  //parser
  static parse(raw_source) {
    let { id, name } = raw_source;
    return new Source(id, name);
  }

  //parse multiple sources
  static parseList(raw_sources) {
    let parsed_sources = _.map(raw_sources, function(raw_source) {
      return Source.parse(raw_source);
    });

    return parsed_sources;
  }

  //serializer
  serialize() {
    let { id, name } = this;

    return {
      id,
      name
    };
  }
}

export default Source;
