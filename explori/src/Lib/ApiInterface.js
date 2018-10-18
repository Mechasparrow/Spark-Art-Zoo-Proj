/**
ApiInterface.js

Interface to interact with the Backend.

**/

//models for parsing
import Collection from "../Models/Collection";
import Item from "../Models/Item";
import Source from "../Models/Source";

//libs
import axios from "axios";
import _ from "lodash";

// get endpoint
import { endpoint } from "./Endpoint";

//api format
let format = "?format=json";

class ApiInterface {
  // Retrieve specific collection
  static getCollection(collection_id) {}

  // Retrieves the collections
  static getCollections() {
    let collections_endpoint = endpoint + "/collections" + format;

    console.log("getting the collections...");

    return new Promise(function(resolve, reject) {
      axios
        .get(collections_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Collection.parseList(data);

          //DEBUG
          console.log("collections loaded");
          console.log(parsed_data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  static getItem(item_id) {}
  // Retrieve specific item

  // Retrieve the items
  static getItems() {
    let items_endpoint = endpoint + "/items" + format;

    console.log("getting the items...");

    return new Promise(function(resolve, reject) {
      axios
        .get(items_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Item.parseList(data);

          //DEBUG
          console.log("items loaded");
          console.log(parsed_data);

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

    console.log("getting the collection items...");

    return new Promise(function(resolve, reject) {
      axios
        .get(collection_items_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Item.parseList(data);

          //DEBUG
          console.log("collection items for collection_id " + collection_id);
          console.log(parsed_data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  // get the collection of the item
  static getItemCollection(item_id) {}

  // get specific source
  static getSource(source_id) {}

  // get the sources of data for exploration
  static getSources() {
    let sources_endpoint = endpoint + "/sources" + format;

    console.log("getting the sources...");

    return new Promise(function(resolve, reject) {
      axios
        .get(sources_endpoint)
        .then(function(res) {
          let data = res.data;

          let parsed_data = Source.parseList(data);

          //DEBUG
          console.log("sources loaded");
          console.log(parsed_data);

          resolve(parsed_data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  //get the collections from the source
  static getSourceCollections(source_id) {}

  //get the source of the collection
  static getCollectionSource(collection_id) {}
}

export default ApiInterface;
