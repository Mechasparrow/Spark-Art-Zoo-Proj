/**
ApiInterface.js

Interface to interact with the Backend.

**/

//models for parsing
import Collection from "../Models/Collection";
import Item from "../Models/Item";
import Source from "../Models/Source";
import Choice from "../Models/Choice";
import Badge from "../Models/Badge";

//libs
import axios from "axios";
import _ from "lodash";

// get endpoint
import { endpoint } from "./Endpoint";

//api format
let format = "?format=json";

class ApiInterface {
  // Retrieve specific collection
  static getCollection(collection_id) {
    let collection_endpoint =
      endpoint + "/collections/" + collection_id + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(collection_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Collection.parse(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  //retrieve all the potential badges
  static getBadges() {
    let badges_endpoint = endpoint + "/badges" + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(badges_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Badge.parseList(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  //retrieve a specific badge
  static getBadge(badge_id) {
    let badge_endpoint = endpoint + "/badges/" + badge_id + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(badge_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Badge.parse(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  // Retrieves the collections
  static getCollections() {
    let collections_endpoint = endpoint + "/collections" + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(collections_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Collection.parseList(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  // Retrieve specific item
  static getItem(item_id) {
    let item_endpoint = endpoint + "/items/" + item_id + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(item_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Item.parse(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  // Retrieve the items
  static getItems() {
    let items_endpoint = endpoint + "/items" + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(items_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Item.parseList(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  // Retrieves the items of collection
  static getCollectionItems(collection_id) {
    let collection_items_endpoint =
      endpoint + "/collections/" + collection_id + "/items/" + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(collection_items_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Item.parseList(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  // get the collection of the item
  static getItemCollection(item_id) {
    return new Promise(function(resolve, reject) {
      ApiInterface.getItem(item_id)
        .then(function(item) {
          return ApiInterface.getCollection(item.collection);
        })
        .then(function(collection) {
          resolve(collection);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  //retrive the choices of an item
  static getItemChoices(item_id) {
    const item_choices_endpoint =
      endpoint + "/items/" + item_id + "/choices/" + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(item_choices_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Choice.parseList(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  //retrive all the choices
  static getChoices() {
    const choices_endpoint = endpoint + "/choices/" + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(choices_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Choice.parseList(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  // get specific source
  static getSource(source_id) {
    let source_endpoint = endpoint + "/sources/" + source_id + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(source_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Source.parse(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  // get the sources of data for exploration
  static getSources() {
    let sources_endpoint = endpoint + "/sources" + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(sources_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Source.parseList(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  //get the collections from the source
  static getSourceCollections(source_id) {
    let source_collections_endpoint =
      endpoint + "/sources/" + source_id + "/collections" + format;

    return new Promise(function(resolve, reject) {
      axios
        .get(source_collections_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Collection.parseList(data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  //get the source of the collection
  static getCollectionSource(collection_id) {
    return new Promise(function(resolve, reject) {
      ApiInterface.getCollection(collection_id)
        .then(function(coll) {
          return ApiInterface.getSource(coll.source);
        })
        .then(function(source) {
          resolve(source);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
}

export default ApiInterface;
