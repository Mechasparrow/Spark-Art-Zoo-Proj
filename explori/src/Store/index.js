/**

./Store/index.js

sets up the redux store for the application with persistence

**/

//redux functions
import { createStore, applyMiddleware } from "redux";

//logger
import logger from "redux-logger";

//redux persistence
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { transformCollections } from "./transforms";

//root reducer
import { rootReducer } from "../Reducers";

//persistence blacklist
let whitelist = ["collections", "score"];

//persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist,
  transforms: [transformCollections]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(logger));
export const persistor = persistStore(store);
