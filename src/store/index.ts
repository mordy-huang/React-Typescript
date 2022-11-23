import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import counterReducer from "@/pages/Home/models/HomeSlice";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { useDispatch } from "react-redux";
import grobalReducer from "./GrobalSlice";
import { Reducer } from "react";
export const history = createBrowserHistory();
// combineReducers({ })
export const store = configureStore({
  reducer: {
    router: connectRouter(history) as Reducer<any, unknown>,
    global: grobalReducer,
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      // .concat(logger)
      .concat(routerMiddleware(history)),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateNoRouter = ReturnType<typeof store.getState>;
export interface RootState extends RootStateNoRouter {
  router: RouterState;
}

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
