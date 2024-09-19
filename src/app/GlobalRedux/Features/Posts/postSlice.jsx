"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsList: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, action) => {
      state.postsList = action.payload;
    },
  },
});

export const { updatePosts } = postSlice.actions;

export default postSlice.reducer;
