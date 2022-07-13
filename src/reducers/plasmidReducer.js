import { createSlice } from '@reduxjs/toolkit'
import plasmidService from '../services/plasmids'
import { createNotification } from './notificationReducer'

const plasmidSlice = createSlice({
  name: 'plasmids',
  initialState: [],
  reducers: {
    editPlasmid(state, action) {
        const id = action.data.id
        const plasmidToChange = state.find(n => n.id === id)
        const changedPlasmid = { 
            ...plasmidToChange, 
            sequence: action.data.sequence
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
    }
  },
})

export const { editPlasmid, appendPlasmid, setPlasmids } = plasmidSlice.actions

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

export default plasmidSlice.reducer