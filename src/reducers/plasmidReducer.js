import { createSlice } from '@reduxjs/toolkit'
import plasmidService from '../services/plasmids'
import { createNotification } from './notificationReducer'

const plasmidSlice = createSlice({
  name: 'plasmids',
  initialState: [],
  reducers: {
    editPlasmid(state, action) {
        const id = action.payload.id
        const plasmidToChange = state.find(n => n.id === id)
        const changedPlasmid = { 
            ...plasmidToChange, 
            name: action.payload.name
        }
        return state.map(plasmid =>
            plasmid.id !== id ? plasmid : changedPlasmid
        )
    },
    appendPlasmid(state, action) {
        state.push(action.payload)
    },
    setPlasmids(state, action) {
      return action.payload
    },
    deletePlasmid(state,action) {
      const id = action.payload.id
      return state.filter(plasmid => plasmid.id !== id)
    }
  },
})

export const { editPlasmid, appendPlasmid, setPlasmids, deletePlasmid } = plasmidSlice.actions

export const initializePlasmids = () => {
    return async dispatch => {
      const plasmids = await plasmidService.getAll()
      dispatch(setPlasmids(plasmids))
    }
}

export const createPlasmid = content => {
    return async dispatch => {
      const newPlasmid= await plasmidService.create(content)
      dispatch(appendPlasmid(newPlasmid))
      dispatch(createNotification([`plasmid ${newPlasmid.name} was added to server`,"confirmation"]))
    }
}

export const removePlasmid = id => {
  return async dispatch => {
    try{
      const removed = await plasmidService.remove(id)
      dispatch(deletePlasmid({id:id}))
      dispatch(createNotification([`plasmid ${id} was deleted from server`,"confirmation"]))
    }
    catch{
      dispatch(deletePlasmid({id:id}))
      dispatch(createNotification([`plasmid ${id} was already deleted from server`,"error"]))
    }
  }
}

export const updatePlasmid = content => {
  return async dispatch => {
    try{
      const updatedPlasmid= await plasmidService.update(content.id,content)
      dispatch(editPlasmid(updatedPlasmid))
    }
    catch{
      dispatch(createNotification([`plasmid ${content.name} was already deleted from server`,"error"]))
      dispatch(editPlasmid({id:content.id}))
    }
  }
}

export default plasmidSlice.reducer