import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  isLoading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    fetchVideoStart: (state) => {
      state.isLoading = true;
    },
    fetchVideoSuccess: (state, action) => {
      state.isLoading = false;
      state.currentVideo = action.payload;
    },
    fetchVideoFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex((id) => id === action.payload),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex((id) => id === action.payload),
          1
        );
      }
    },
    notFetching: (state) => initialState,
  },
});

export const {
  fetchVideoStart,
  fetchVideoSuccess,
  fetchVideoFailure,
  like,
  dislike,
  notFetching,
} = videoSlice.actions;
export default videoSlice.reducer;
