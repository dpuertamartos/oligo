import React from 'react'
import Oligo from './Oligo'

const Oligos = ({oligosToShow, editOligo}) => {
    return (
        <ul>
            {oligosToShow.map(oligo => 
            <Oligo key={oligo.id} oligo={oligo} editOligo={editOligo} />
            )}
        </ul>
    )}

export default Oligos