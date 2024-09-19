"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postSlice from "./Features/Posts/postSlice";

const rootReducer = combineReducers({
  posts: postSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
