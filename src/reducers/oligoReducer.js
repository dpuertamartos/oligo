import { createSlice } from '@reduxjs/toolkit'
import oligoService from '../services/oligos'

const oligoSlice = createSlice({
  name: 'oligos',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
        const id = action.data.id
        const oligoToChange = state.find(n => n.id === id)
        const changedOligo = { 
            ...oligoToChange, 
            sequence: action.data.sequence
        }
        return state.map(oligo =>
            oligo.id !== id ? oligo : changedOligo
        )
    },
    appendOligo(state, action) {
        state.push(action.payload)
    },
    setOligos(state, action) {
      return action.payload
    }
  },
})

export const { createNote, toggleImportanceOf, appendOligo, setOligos } = oligoSlice.actions

export const initializeOligos = () => {
    return async dispatch => {
      const oligos = await oligoService.getAll()
      dispatch(setOligos(oligos))
    }
}

export const createOligo = content => {
    return async dispatch => {
      const newOligo= await oligoService.create(content)
      dispatch(appendOligo(newOligo))
    }
}

export default oligoSlice.reducer