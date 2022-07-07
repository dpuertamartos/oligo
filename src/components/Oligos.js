import React from 'react'
import Oligo from './Oligo'

const Oligos = ({oligosToShow}) => {
    return (
        <ul>
            {oligosToShow.map(oligo => 
            <Oligo key={oligo.id} oligo={oligo} />
            )}
        </ul>
    )}

export default Oligos