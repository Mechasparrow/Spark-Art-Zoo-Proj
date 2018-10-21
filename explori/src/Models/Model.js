/**
./Models/Model.js

Generic Model

**/

//util libs
import _ from "lodash";

class Model {
  constructor(obj) {
    _.assign(this, obj);
  }

  serialize() {
    var object = _.assign({}, this);
    return object;
  }

  static serializeList(model_list) {
    var objects = _.map(model_list, function(model) {
      return Model.parse(model).serialize();
    });

    return objects;
  }

  static parse(raw_model, proto = null) {
    var model = _.assign(new Model(), raw_model);

    if (proto !== null) {
      return _.assign(new proto(), model);
    } else {
      return model;
    }
  }

  static parseList(raw_models, proto = null) {
    var models = _.map(raw_models, function(raw_model) {
      return Model.parse(raw_model, proto);
    });

    return models;
  }
}

export default Model;
