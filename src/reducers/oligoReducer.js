import { createSlice } from '@reduxjs/toolkit'
import { createNotification } from './notificationReducer'
import oligoService from '../services/oligos'

const oligoSlice = createSlice({
  name: 'oligos',
  initialState: [],
  reducers: {
    updateOligo(state, action) {
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

export const { updateOligo, appendOligo, setOligos, deleteOligo } = oligoSlice.actions

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
      dispatch(createNotification(
        [`oligo ${newOligo.sequence} was added to server`,"confirmation"]
      ))
    }
}

export const removeOligo = id => {
    return async dispatch => {
      try{
        const removed = await oligoService.remove(id)
        dispatch(deleteOligo({id:id}))
        dispatch(createNotification([`oligo ${id} was deleted from server`,"confirmation"]))
      }
      catch{
        //not getting error from backend when oligo is already deleted
        dispatch(deleteOligo({id:id}))
        dispatch(createNotification([`oligo ${id} was already deleted from server`,"error"]))
      }
    }
}

export const editOligo = content => {
    return async dispatch => {
      try{
        const updatedOligo = await oligoService.update(content.id,content)
        dispatch(updateOligo(updatedOligo))
      }
      catch{
        dispatch(createNotification([`oligo ${content.sequence} was already deleted from server`,"error"]))
        dispatch(deleteOligo({id:content.id}))
      }
    }
}

export default oligoSlice.reducer