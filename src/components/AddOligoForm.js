import React from 'react'

const AddOligoForm = ({onSubmit,ipValue,ipOnChange}) => {
    return( 
    <form onSubmit={onSubmit}>
      <input value={ipValue} onChange={ipOnChange}/>
      <button type="submit">save</button>
    </form>
    )
  }

export default AddOligoForm