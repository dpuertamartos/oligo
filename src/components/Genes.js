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
    
    const addGene = (geneObject) => {
        geneFormRef.current.toggleVisibility()
        console.log("adding gene", geneObject)
        geneService
            .create(geneObject)
            .then(returnedGene => {
                setGenes(genes.concat(returnedGene))
                setErrorMessage(
                    [`gene ${geneObject.name} was added to server`,"confirmation"]
                )
                setTimeout(()=>{setErrorMessage(null)},5000)
            })
            
    }

    const deleteGene = id => {
        const gene = genes.find(o => o.id === id)
        if(window.confirm(`do you want delete gene with ID: ${id} and name: ${gene.name}?`)){
          geneService
            .remove(id)
            .then(()=>{
              setGenes(genes.filter(n => n.id !== id))
              setErrorMessage(
                [`gene ${gene.name} was deleted from server`,"confirmation"]
              )
            })
            .catch(error => {
              setErrorMessage(
                [`gene ${gene.name} was already deleted from server`,"error"]
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setGenes(genes.filter(n=>n.id !== id))
            })
        }
      }
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