import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./Slice/appSlice";
import packageSlice from "./Slice/packageSlice";
import contactSlice from "./Slice/contactSlice";
import authSlice from "./Slice/authSlice";

export const store = configureStore({
    reducer: {
        appSlice,
        packageSlice,
        contactSlice,
        authSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch