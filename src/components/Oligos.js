import React from 'react'
import Oligo from './Oligo'

const Oligos = ({oligosToShow, editOligo, deleteOligo}) => {
    return (
        <ul>
            {oligosToShow.map(oligo => 
            <Oligo key={oligo.id} oligo={oligo} editOligo={editOligo} deleteOligo={deleteOligo} />
            )}
        </ul>
    )}

export default Oligos