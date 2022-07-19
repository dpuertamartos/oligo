import { useState } from 'react'
import React from 'react'
import EditForm from './EditForm'
import ReactSequenceViewer from 'react-sequence-viewer'
import Gene from './Gene'

const Oligo = ({oligo, editOligo, deleteOligo}) => {
    const [newEdit, setNewEdit] = useState(oligo.sequence)
    const [showEdit, setNewShowEdit] = useState(false)
    const [showSeq, setNewShow] = useState(false)

    const changeOligo = (event) => {
        event.preventDefault()
        editOligo(oligo.id, newEdit)
    }
    const handleEditChange = (event) => {
        console.log(event.target.value)
        setNewEdit(event.target.value.toUpperCase())
    }


    return(
        <div className="card olig" style={{width: "100%"}}>
        <div className="card-body">
            <ReactSequenceViewer title={oligo.name||"OLIGO"} id={oligo.id} sequence={oligo.sequence} />
            <button type="button" className="btn btn-outline-primary card-link" onClick={()=>setNewShowEdit(!showEdit)}>EDIT</button>
            <button type="button" className="btn btn-outline-danger card-link" onClick={()=>deleteOligo(oligo.id)}>DELETE</button>
            <button type="button" className={`btn btn${showSeq ? "" : "-outline"}-success card-link`} onClick={()=>setNewShow(!showSeq)}>INFO</button>
            {showSeq
                ? <p class="card-text">
                    <div>GENES: {oligo.genes.map(gene=><span>{gene.name}</span>)}</div>
                    <div>PLASMIDS: {oligo.plasmids.map(plasmid=><span>{plasmid.name}</span>)}</div>
                  </p>
                : <span></span>
            }
            <p class="card-text">            {showEdit 
                ? <EditForm onSubmit={changeOligo} ipValue={newEdit} ipOnChange={handleEditChange} /> 
                : <span></span> }
            </p>
        </div>
        </div>
    )
}

export default Oligo