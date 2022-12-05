import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import counterReducer from "@/pages/Home/models/HomeSlice";
import toduListReducer  from "@/pages/Test/models/TodoListSlice";

import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { useDispatch } from "react-redux";
import grobalReducer from "./GrobalSlice";
import { Reducer } from "react";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage,
}
  
export const history = createBrowserHistory();

const rootReducer = combineReducers({ 
  router: connectRouter(history) as Reducer<any, unknown>,
  global: grobalReducer,
  counter: counterReducer,
  toduList: toduListReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

// combineReducers({ })
export const store = configureStore({
  reducer: persistedReducer,
  devTools:process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(logger)
      .concat(routerMiddleware(history)),
});
export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateNoRouter = ReturnType<typeof store.getState>;
export interface RootState extends RootStateNoRouter {
  router: RouterState;
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
