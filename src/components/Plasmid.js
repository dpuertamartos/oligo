import { useState } from 'react'
import React from 'react'
import EditForm from './EditForm'

const Plasmid = ({plasmid, editPlasmid, deletePlasmid}) => {
    const [newEdit, setNewEdit] = useState(plasmid.name)
    const [showEdit, setNewShowEdit] = useState(false)

    const changePlasmid= (event) => {
        event.preventDefault()
        editPlasmid(plasmid.id, newEdit)
    }
    const handleEditChange = (event) => {
        console.log(event.target.value)
        setNewEdit(event.target.value.toUpperCase())
    }

    return(
        <li>{plasmid.name}<button onClick={()=>setNewShowEdit(!showEdit)}>EDIT</button><button onClick={()=>deletePlasmid(plasmid.id)}>DELETE</button>
            {showEdit 
                ? <EditForm onSubmit={changePlasmid} ipValue={newEdit} ipOnChange={handleEditChange} /> 
                : <span></span> }
            <p>{plasmid.sequence}</p>
        </li>

    )
}

export default Plasmid