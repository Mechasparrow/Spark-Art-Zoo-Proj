/**
./Store/transforms/index.js

defines the transforms that serializes and parses saved redux data

**/

//redux persistence
import { createTransform } from "redux-persist";

//import models
import CompletedItem from "../../Models/CompletedItem";

//performs needed conversions for completed items
export const transformCompletedItems = createTransform(
  (inboundState, key) => {
    let completed_items = inboundState;
    return CompletedItem.serializeList(completed_items);
  },
  (outboundState, key) => {
    let raw_completed_items = outboundState;
    return CompletedItem.parseList(raw_completed_items);
  },
  { whitelist: ["completed_items"] }
);
