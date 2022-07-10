import { useState } from 'react'
import React from 'react'
import EditForm from './EditForm'

const Oligo = ({oligo, editOligo, deleteOligo}) => {
    const [newEdit, setNewEdit] = useState(oligo.sequence)
    const [showEdit, setNewShowEdit] = useState(false)

    const changeOligo = (event) => {
        event.preventDefault()
        editOligo(oligo.id, newEdit)
    }
    const handleEditChange = (event) => {
        console.log(event.target.value)
        setNewEdit(event.target.value.toUpperCase())
    }


    return(
        <li>{oligo.name}<button onClick={()=>setNewShowEdit(!showEdit)}>EDIT</button><button onClick={()=>deleteOligo(oligo.id)}>DELETE</button>
            {showEdit 
                ? <EditForm onSubmit={changeOligo} ipValue={newEdit} ipOnChange={handleEditChange} /> 
                : <span></span> }
            <p>{oligo.sequence}</p>
        </li>

    )
}

export default Oligo