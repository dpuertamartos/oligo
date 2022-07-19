import { useState } from 'react'
import React from 'react'
import EditForm from './EditForm'
import Modalsequencer from './Modalsequencer'
import ReactSequenceViewer from 'react-sequence-viewer';

const Gene = ({gene, editGene, deleteGene}) => {
    const [newEdit, setNewEdit] = useState(gene.name)
    const [showEdit, setNewShowEdit] = useState(false)
    const [showSeq, setNewShow] = useState(false)

    const changeGene = (event) => {
        event.preventDefault()
        editGene(gene.id, newEdit)
    }
    const handleEditChange = (event) => {
        console.log(event.target.value)
        setNewEdit(event.target.value.toUpperCase())
    }

    return(    
        <div className="card" style={{width: "100%"}}>
        <div className="card-body">
            <h5 className="card-title">{gene.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{gene.organism}</h6>
            <p className="card-text">{gene.description}</p>
            {showSeq
                ? <ReactSequenceViewer title={gene.name} id={gene.id} sequence={gene.sequence} search={true} />
                : <span></span>
            }
            <button type="button" className="btn btn-outline-primary card-link" onClick={()=>setNewShowEdit(!showEdit)}>EDIT</button>
            <button type="button" className="btn btn-outline-danger card-link" onClick={()=>deleteGene(gene.id)}>DELETE</button>
            <button type="button" className={`btn btn${showSeq ? "" : "-outline"}-success card-link`} onClick={()=>setNewShow(!showSeq)}>SEQ</button>
            
            <p class="card-text">            {showEdit 
            ? <EditForm onSubmit={changeGene} ipValue={newEdit} ipOnChange={handleEditChange} /> 
            : <span></span> }</p>
        </div>
        </div>
    )
}

export default Gene