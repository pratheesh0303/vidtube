import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedinUser: null,
  isLoading: false,
  error: false,
  channel: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.loggedinUser = action.payload;
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState;
    },
    subscribed: (state, action) => {
      console.log(state, action)
      if (!state.loggedinUser.subscribed.includes(action.payload)) {
        state.loggedinUser.subscribed.push(action.payload);
      }
    },
    unsubscribed: (state, action) => {
      if (state.loggedinUser.subscribed.includes(action.payload)) {
        state.loggedinUser.subscribed.splice(
          state.loggedinUser.subscribed.findIndex(
            (id) => id === action.payload
          ),
          1
        );
      }
    },
    updateUserDetails: (state, action) => {
      state.loggedinUser.name = action.payload.name;
      state.loggedinUser.image = action.payload.image;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscribed,
  unsubscribed,
  updateUserDetails,
} = userSlice.actions;
export default userSlice.reducer;
