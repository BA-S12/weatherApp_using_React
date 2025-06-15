import { configureStore } from '@reduxjs/toolkit'
import geoSlice  from './slice/GeoSlice'

export const store = configureStore({
    reducer:{
        geo:geoSlice
    }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch