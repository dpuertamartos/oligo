import { createSlice } from '@reduxjs/toolkit'
import oligoService from '../services/oligos'

const oligoSlice = createSlice({
  name: 'oligos',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
        const id = action.payload.id
        const oligoToChange = state.find(n => n.id === id)
        const changedOligo = { 
            ...oligoToChange, 
            sequence: action.payload.sequence
        }
        return state.map(oligo =>
            oligo.id !== id ? oligo : changedOligo
        )
    },
    appendOligo(state, action) {
        state.push(action.payload)
    },
    deleteOligo(state, action) {
        const id = action.payload.id
        return state.filter(oligo => oligo.id !== id)
    },
    setOligos(state, action) {
      return action.payload
    }
  },
})

export const { createNote, toggleImportanceOf, appendOligo, setOligos, deleteOligo } = oligoSlice.actions

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

export const removeOligo = id => {
    return async dispatch => {
        await oligoService.remove(id)
        // need to add error handling
        dispatch(deleteOligo({id:id}))
    }
}

export default oligoSlice.reducer