import { createSlice } from '@reduxjs/toolkit'
import geneService from '../services/genes'

const geneSlice = createSlice({
  name: 'genes',
  initialState: [],
  reducers: {
    editGene(state, action) {
        const id = action.data.id
        const geneToChange = state.find(n => n.id === id)
        const changedGene = { 
            ...geneToChange, 
            sequence: action.data.sequence
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
    }
  },
})

export const { editGene, appendGene, setGenes } = geneSlice.actions

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
    }
}

export default geneSlice.reducer