import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

const compareByCreatedAt = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error('user friends non-existent');
            }
        },
        setPosts: (state, action) => {
            const sortedPosts = action.payload.posts.slice().sort(compareByCreatedAt)

            state.posts = sortedPosts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });

            const sortedPosts = updatedPosts.slice().sort(compareByCreatedAt);
            state.posts = sortedPosts;
        }
    }
})

export const { 
    setMode,
    setLogin,
    setLogout,
    setUser,
    setFriends,
    setPosts,
    setPost } = authSlice.actions;

export default authSlice.reducer;