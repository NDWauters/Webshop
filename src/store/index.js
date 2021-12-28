import { combineReducers } from 'redux';
import { reducer as productsReducer } from "./products/reducer";
import { reducer as favoritesReducer } from "./favorites/reducer";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
    products: productsReducer,
    favorites: favoritesReducer
});

const persistConfig = {
    key: 'state',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default store;