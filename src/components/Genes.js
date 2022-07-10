import React from 'react'
import { useState, useEffect } from 'react'
import Gene from './Gene'
import geneService from "../services/genes"

const Genes = () => {
    const [genes, setGenes] = useState([])

    useEffect(() => {
        geneService
          .getAll()
          .then(initialGenes => {
            setGenes(initialGenes)
          })
      }, [])

    const deleteGene = (id) => console.log("deleting gene", id)
    const editGene = (id, edit) => console.log("editing gene",id,edit)

    const genesToShow = genes

    return (
        <ul>
            {genes.map(gene => 
            <Gene key={gene.id} gene={gene} deleteGene={deleteGene} editGene={editGene} />
            )}
        </ul>
    )}

export default Genes