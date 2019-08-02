import {createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers'
import middlewares from './middlewares'

const persistConfig = {
    key: 'root123',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
    persistedReducer,
    applyMiddleware(promiseMiddleware)
)

export const persistor = persistStore(store)
