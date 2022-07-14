import { createSlice } from '@reduxjs/toolkit'
import geneService from '../services/genes'
import { createNotification } from './notificationReducer'

const geneSlice = createSlice({
  name: 'genes',
  initialState: [],
  reducers: {
    updateGene(state, action) {
        const id = action.payload.id
        const geneToChange = state.find(n => n.id === id)
        const changedGene = { 
            ...geneToChange, 
            name: action.payload.name
        }
        return state.map(gene =>
            gene.id !== id ? gene : changedGene
        )
    },
    appendGene(state, action) {
        state.push(action.payload)
    },
    setGenes(state, action) {
      return action.payload
    },
    deleteGene(state,action) {
      const id = action.payload.id
      return state.filter(gene => gene.id !== id)
    }
  },
})

export const { updateGene, appendGene, setGenes, deleteGene } = geneSlice.actions

export const initializeGenes = () => {
    return async dispatch => {
      const genes = await geneService.getAll()
      dispatch(setGenes(genes))
    }
}

export const createGene = content => {
    return async dispatch => {
      const newGene= await geneService.create(content)
      dispatch(appendGene(newGene))
      dispatch(createNotification([`gene ${newGene.name} was added to server`,"confirmation"]))
    }
}
export const removeGene = id => {
  return async dispatch => {
    try{
      const removed = await geneService.remove(id)
      dispatch(deleteGene({id:id}))
      dispatch(createNotification([`gene ${id} was deleted from server`,"confirmation"]))
    }
    catch{
      dispatch(deleteGene({id:id}))
      dispatch(createNotification([`gene ${id} was already deleted from server`,"error"]))
    }
  }
}

export const editGene = content => {
  return async dispatch => {
    try{
      const updatedGene = await geneService.update(content.id,content)
      console.log(updatedGene,"updatedGene")
      dispatch(updateGene(updatedGene))
    }
    catch{
      dispatch(createNotification([`gene ${content.name} was already deleted from server`,"error"]))
      dispatch(deleteGene({id:content.id}))
    }
  }
}

export default geneSlice.reducer