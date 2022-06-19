import { configureStore } from '@reduxjs/toolkit'
import { pomoWorkSlice, pomoBreakSlice, taskNameSlice } from './name'

export default configureStore({
  reducer: {
    pomoWork:pomoWorkSlice.reducer,
    pomoBreak:pomoBreakSlice.reducer, 
    taskName:taskNameSlice.reducer
  },
})