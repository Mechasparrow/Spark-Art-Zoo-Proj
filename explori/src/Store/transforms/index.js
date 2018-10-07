/**
./Store/transforms/index.js

defines the transforms that serializes and parses saved redux data

**/

//redux persistence
import { createTransform } from "redux-persist";

//import models
import Collection from "../../Models/Collection";

export const transformCollections = createTransform(
  (inboundState, key) => {
    let colls = inboundState;
    return Collection.serializeList(colls);
  },

  (outboundState, key) => {
    let raw_colls = outboundState;
    return Collection.parseList(raw_colls);
  },

  { whitelist: ["collections"] }
);
