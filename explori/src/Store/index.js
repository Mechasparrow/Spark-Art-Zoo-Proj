/**

./Store/index.js

sets up the redux store for the application with persistence

**/

//redux functions
import { createStore, applyMiddleware } from "redux";

// redux thunk
import thunk from "redux-thunk";

//logger
import logger from "redux-logger";

//redux persistence
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { transformCompletedItems } from "./transforms";

//root reducer
import { rootReducer } from "../Reducers";

//persistence blacklist
let whitelist = ["completed_items", "score"];

//persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist,
  transforms: [transformCompletedItems]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(logger, thunk)
);
export const persistor = persistStore(store);
