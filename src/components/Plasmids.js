import React from 'react'
import { useState, useEffect } from 'react'
import Plasmid from './Plasmid'
import plasmidService from "../services/plasmids"

const Plasmids = () => {
    const [plasmids, setPlasmids] = useState([])

    useEffect(() => {
        plasmidService
          .getAll()
          .then(initialPlasmids => {
            setPlasmids(initialPlasmids)
          })
      }, [])

    const deletePlasmid = (id) => console.log("deleting plasmid", id)
    const editPlasmid = (id, edit) => console.log("editing plasmid",id,edit)

    const genesToShow = plasmids

    return (
        <ul>
            {plasmids.map(p => 
            <Plasmid key={p.id} plasmid={p} deletePlasmid={deletePlasmid} editGene={editPlasmid} />
            )}
        </ul>
    )}

export default Plasmids