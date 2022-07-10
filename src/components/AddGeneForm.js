import React, {useState} from 'react'

const AddGeneForm = ({createGene}) => {
    const [newGene, setNewGene] = useState("Enter sequence")
    const [newName, setNewName] = useState("Enter name")
    const [newDescription, setNewDescription] = useState("Enter description")
    const [organism, setNewOrganism] = useState("Enter organism")

    const handleOligoChange = (event) => {
      console.log(event.target.value)
      setNewGene(event.target.value.toUpperCase())
    }

    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value.toUpperCase())
    }

    const handleDescriptionChange = (event) => {
      setNewDescription(event.target.value)
    }

    const handleOrganismChange = (event) => {
      setNewOrganism(event.target.value)
    }

    const addGene = (event) => {
      event.preventDefault()
      const oligoObject = {
        name: newName,
        sequence: newGene,
        description: newDescription,
        organism: organism
      }
      createGene(oligoObject)
      setNewGene("Enter sequence")
      setNewName("Enter name")
      setNewDescription("Enter description")
      setNewOrganism("Enter organism")
    }

    return( 
    <form onSubmit={addGene}>
      <label>
      NAME <input value={newName} onChange={handleNameChange}/>
      </label>
      <label>
      SEQUENCE <input value={newGene} onChange={handleOligoChange}/>
      </label>
      <label>
      DESCRIPTION <input value={newDescription} onChange={handleDescriptionChange}/>
      </label>
      <label>
      ORGANISM <input value={organism} onChange={handleOrganismChange}/>
      </label>
      <button type="submit">save</button>
    </form>
    )
  }

export default AddGeneForm