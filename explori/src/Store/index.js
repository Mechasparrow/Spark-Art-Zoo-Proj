//redux functions
import {createStore, applyMiddleware} from 'redux';

//logger
import logger from 'redux-logger'

//root reducer
import {rootReducer} from '../Reducers';

export const store = createStore(rootReducer, applyMiddleware(logger));
