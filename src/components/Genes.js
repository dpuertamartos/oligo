import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Gene from './Gene'
import geneService from "../services/genes"
import AddGeneForm from './AddGeneForm'
import Togglable from './Togglable'

const Genes = ({setErrorMessage, user}) => {
    const [genes, setGenes] = useState([])

    useEffect(() => {
        geneService
          .getAll()
          .then(initialGenes => {
            setGenes(initialGenes)
          })
      }, [])
    
    const addGene = (id) => {
        geneFormRef.current.toggleVisibility()
        console.log("adding gene", id)
    }
    const deleteGene = (id) => console.log("deleting gene", id)
    const editGene = (id, edit) => console.log("editing gene",id,edit)
    
    const geneFormRef = useRef()
    const genesToShow = genes

    return (
        <div>
        <ul>
            {genes.map(gene => 
            <Gene key={gene.id} gene={gene} deleteGene={deleteGene} editGene={editGene} />
            )}
        </ul>
        {user !== null &&
            <Togglable buttonLabel="new gene" ref={geneFormRef}>
                <AddGeneForm
                createGene={addGene}
                />
            </Togglable>
        }
        </div>
    )}

export default Genes