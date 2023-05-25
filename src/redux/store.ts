import { counterRedux } from '@/slices/conunterSlices'
import { dataRedux } from '@/slices/incomes/dataSearch'
import { incomeRedux } from '@/slices/incomes/incomesSlices'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: { counter: counterRedux, incomes: incomeRedux, data: dataRedux }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
