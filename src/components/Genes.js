import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Gene from './Gene'
import AddGeneForm from './AddGeneForm'
import Togglable from './Togglable'
import { createGene, removeGene, editGene } from '../reducers/geneReducer'
import Superfilter from './Superfilter'
import { useSelector, useDispatch } from 'react-redux'
import { appendTypeGene, deleteTypeGene, changeSearchGene } from '../reducers/filterReducer'

const Genes = ({user}) => {
    const dispatch = useDispatch()
    const genes = useSelector(state => state.genes)
    const filterstate = useSelector(state => state.filter.genes)
    
    const addGene = (geneObject) => {
        geneFormRef.current.toggleVisibility()
        console.log("adding gene", geneObject)
        dispatch(createGene(geneObject))  
    }

    const deleteGene = id => {
        const gene = genes.find(o => o.id === id)
        if(window.confirm(`do you want delete gene with ID: ${id} and name: ${gene.name}?`)){
          dispatch(removeGene(id))
        }
    } 
     
    const updateGene = (id, edit) => {
      const gene = genes.find(o => o.id === id)
      dispatch(editGene({...gene, name:edit}))
    }
    
    const geneFormRef = useRef()
    const genesToShow = genes

    return (
        <div>
          <div><span className="titleSection">Genes </span>
          <span>
            {user !== null &&
              <Togglable buttonLabel="new gene" ref={geneFormRef}>
                  <AddGeneForm
                  createGene={addGene}
                  />
              </Togglable>
            }
            </span>
          </div>
        <Superfilter filterstate={filterstate} appendType={appendTypeGene} 
        deleteType={deleteTypeGene} changeSearch={changeSearchGene}/>
        <ul>
            {genes.map(gene => 
            <Gene key={gene.id} gene={gene} deleteGene={deleteGene} editGene={updateGene} />
            )}
        </ul>
        </div>
    )}

export default Genes