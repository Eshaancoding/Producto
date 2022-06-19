import { createSlice } from '@reduxjs/toolkit'

export const taskNameSlice = createSlice({
  name: 'task',
  initialState: {
    value: '',
  },
  reducers: {
    changeValue:(state,action)=>{
        state.value=action.payload
    }
  },
})

export const pomoBreakSlice = createSlice({
  name: 'pomoBreak',
  initialState: {
    value: '-1',
  },
  reducers: {
    changeValue:(state,action)=>{
        state.value=action.payload
    }
  },
})

export const pomoWorkSlice = createSlice({
  name: 'work',
  initialState: {
    value: '2626',
  },
  reducers: {
    changeValue:(state,action)=>{
        console.log("State values:", state.value)
        console.log("Action Payload:", action.payload)
        state.value=action.payload
    }
  },
})