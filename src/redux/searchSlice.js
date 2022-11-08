import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchVideoTerm: ''
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchTerm: (state, action)=>{
            state.searchVideoTerm = action.payload
        },
        clearSearch : ()=> {
            return initialState
        }

    }
})

export const {searchTerm, clearSearch} = searchSlice.actions;
export default searchSlice.reducer;
