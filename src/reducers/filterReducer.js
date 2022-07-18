import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    type: [],
    search: ["","",""]
    },
  reducers: {
    appendType(state, action) {
        return {...state, type: state.type.concat(action.payload)}
    },
    deleteType(state, action) {
        return {...state, type: state.type.filter(a => a !== action.payload)}
    },
    changeSearch(state, action) {
        let pos = action.payload.pos
        state.search[pos] = action.payload.change
    }
  },
})

export const { appendType, deleteType, changeSearch } = filterSlice.actions

export default filterSlice.reducer