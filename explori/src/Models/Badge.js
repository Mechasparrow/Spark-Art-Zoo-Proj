/**

./Models/Badge.js

JavaScript Model for the Collection Badges

**/


//util lib
import _ from "lodash";

//root model
import Model from "./Model";

class Badge extends Model {
  //initialize model

  constructor(id, collection, image_link) {
    super({
      id,
      collection,
      image_link
    })
  }

  static parse(raw_badge) {
    return Model.parse(raw_badge, Badge)
  }

  static parseList(raw_badges) {
    return Model.parseList(raw_badges, Badge)
  }

}
