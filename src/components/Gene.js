import { useState } from 'react'
import React from 'react'
import EditForm from './EditForm'

const Gene = ({gene, editGene, deleteGene}) => {
    const [newEdit, setNewEdit] = useState(gene.name)
    const [showEdit, setNewShowEdit] = useState(false)

    const changeGene = (event) => {
        event.preventDefault()
        editGene(gene.id, newEdit)
    }
    const handleEditChange = (event) => {
        console.log(event.target.value)
        setNewEdit(event.target.value.toUpperCase())
    }

    return(
        <li>{gene.name}<button onClick={()=>setNewShowEdit(!showEdit)}>EDIT</button><button onClick={()=>deleteGene(gene.id)}>DELETE</button>
            {showEdit 
                ? <EditForm onSubmit={changeGene} ipValue={newEdit} ipOnChange={handleEditChange} /> 
                : <span></span> }
            <p>{gene.sequence}</p>
        </li>

    )
}

export default Gene