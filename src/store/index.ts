import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import counterReducer from "@/pages/Home/HomeSlice";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { useDispatch } from "react-redux";
import { Reducer } from "react";
export const history = createBrowserHistory();
// combineReducers({ })
export const store = configureStore({
  reducer: {
    router: connectRouter(history) as Reducer<any,unknown>,
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger).concat(routerMiddleware(history)),
  // middleware:[logger,thunkMiddleware,routerMiddleware(history)]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateNoRouter = ReturnType<typeof store.getState>;
export interface RootState extends RootStateNoRouter{
  router:RouterState
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
