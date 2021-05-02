import { configureStore } from '@reduxjs/toolkit'
import feedReducer from '../components/feed/feedSlice'
export default configureStore({
    reducer: {
        feed: feedReducer
    },
})