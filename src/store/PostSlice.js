import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    post: [],
};
const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPost: (state, action) => {
            state.status = true;
            state.post = action.payload;
        },
    },
});

export const { setPost } = PostSlice.actions;
export default PostSlice.reducer;
