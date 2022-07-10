import React, {useState} from 'react'

const AddOligoForm = ({createOligo}) => {
    const [newOligo, setNewOligo] = useState("Enter oligonucleotid")
    const [newName, setNewName] = useState("Enter name")

    const handleOligoChange = (event) => {
      console.log(event.target.value)
      setNewOligo(event.target.value.toUpperCase())
    }

    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value.toUpperCase())
    }

    const addOligo = (event) => {
      event.preventDefault()
      const oligoObject = {
        name: newName,
        sequence: newOligo
      }
      createOligo(oligoObject)
      setNewOligo("Enter oligo")
      setNewName("Enter name")
    }

    return( 
    <form onSubmit={addOligo}>
      <label>
      NAME <input value={newName} onChange={handleNameChange}/>
      </label>
      <label>
      SEQUENCE <input value={newOligo} onChange={handleOligoChange}/>
      </label>
      <button type="submit">save</button>
    </form>
    )
  }

export default AddOligoForm