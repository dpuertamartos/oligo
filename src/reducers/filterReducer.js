import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    oligos: {
      type: [],
      search: ["","",""]
    },
    genes: {
      type: [],
      search: ["","",""]
    },
    plasmids: {
      type: [],
      search: ["","",""]
    }

    },
  reducers: {
    appendTypeOligo(state, action) {
        return {...state, oligos: {...state.oligos, type: state.oligos.type.concat(action.payload)}}
    },
    deleteTypeOligo(state, action) {
        return {...state, oligos: {...state.oligos, type: state.oligos.type.filter(a => a !== action.payload)}}
    },
    changeSearchOligo(state, action) {
        let pos = action.payload.pos
        state.oligos.search[pos] = action.payload.change
    },
    appendTypeGene(state, action) {
      return {...state, genes: {...state.genes, type: state.genes.type.concat(action.payload)}}
    },
    deleteTypeGene(state, action) {
      return {...state, genes: {...state.genes, type: state.genes.type.filter(a => a !== action.payload)}}
    },
    changeSearchGene(state, action) {
        let pos = action.payload.pos
        state.genes.search[pos] = action.payload.change
    },
    appendTypePlasmid(state, action) {
      return {...state, plasmids: {...state.plasmids, type: state.plasmids.type.concat(action.payload)}}
    },
    deleteTypePlasmid(state, action) {
      return {...state, plasmids: {...state.plasmids, type: state.plasmids.type.filter(a => a !== action.payload)}}

    },
    changeSearchPlasmid(state, action) {
        let pos = action.payload.pos
        state.plasmids.search[pos] = action.payload.change
    }
  },
})

export const { appendTypeOligo, appendTypeGene, appendTypePlasmid,
   deleteTypeOligo, deleteTypeGene, deleteTypePlasmid,
   changeSearchOligo, changeSearchGene, changeSearchPlasmid } = filterSlice.actions


export default filterSlice.reducer