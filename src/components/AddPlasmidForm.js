import React, {useState} from 'react'

const AddPlasmidForm = ({createPlasmid}) => {
    const [newPlasmid, setNewPlasmid] = useState("Enter sequence")
    const [newName, setNewName] = useState("Enter name")
    const [newDescription, setNewDescription] = useState("Enter description")

    const handleOligoChange = (event) => {
      console.log(event.target.value)
      setNewPlasmid(event.target.value.toUpperCase())
    }

    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value.toUpperCase())
    }

    const handleDescriptionChange = (event) => {
      setNewDescription(event.target.value)
    }

    const addPlasmid = (event) => {
      event.preventDefault()
      const plasmidObject = {
        name: newName,
        sequence: newPlasmid,
        description: newDescription
      }

      createPlasmid(plasmidObject)
      setNewPlasmid("Enter sequence")
      setNewName("Enter name")
      setNewDescription("Enter description")
      
    }

    return( 
    <form onSubmit={addPlasmid}>
      <label>
      NAME <input value={newName} onChange={handleNameChange}/>
      </label>
      <label>
      SEQUENCE <input value={newPlasmid} onChange={handleOligoChange}/>
      </label>
      <label>
      DESCRIPTION <input value={newDescription} onChange={handleDescriptionChange}/>
      </label>
      <button type="submit">save</button>
    </form>
    )
  }

export default AddPlasmidForm