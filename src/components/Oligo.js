import React from 'react'

const Oligo = ({oligo}) => {

    return(
        <li>{oligo.sequence}<button onClick={()=>console.log("hi")}>EDIT</button></li>
    )
}

export default Oligo