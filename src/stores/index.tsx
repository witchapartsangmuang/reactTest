import { configureStore } from '@reduxjs/toolkit'
import formSelectorReducer from './formSelector'
import employeeReducer from './employee'
import languageReducer from './language'
export const store = configureStore({
  reducer: {
    formSelectorReducer: formSelectorReducer,
    employeeReducer: employeeReducer,
    languageReducer:languageReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch