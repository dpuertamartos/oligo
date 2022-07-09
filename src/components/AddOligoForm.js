import React, {useState} from 'react'

const AddOligoForm = ({createOligo}) => {
    const [newOligo, setNewOligo] = useState("Enter oligonucleotid")

    const handleOligoChange = (event) => {
      console.log(event.target.value)
      setNewOligo(event.target.value.toUpperCase())
    }

    const addOligo = (event) => {
      event.preventDefault()
      const oligoObject = {
        sequence: newOligo
      }
      createOligo(oligoObject)
      setNewOligo("Enter oligo")
    }

    return( 
    <form onSubmit={addOligo}>
      <input value={newOligo} onChange={handleOligoChange}/>
      <button type="submit">save</button>
    </form>
    )
  }

export default AddOligoForm