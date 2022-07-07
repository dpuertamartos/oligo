import { useState, useEffect } from 'react'
import oligoService from './services/oligos'
import Oligos from './components/Oligos'
import Filter from './components/Filter'
import AddOligoForm from './components/AddOligoForm'


const App = () => {
  const [oligos, setOligos] = useState([])
  const [newOligo, setNewOligo] = useState("Enter oligonucleotid")
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState("Search sequence")
  

  useEffect(() => {
    oligoService
      .getAll()
      .then(initialOligos => {
        setOligos(initialOligos)
      })
  }, [])

  const addOligo = (event) => {
    event.preventDefault()
    const oligoObject = {
      id: oligos[oligos.length-1].id + 1,
      sequence: newOligo,
    }

    oligoService
      .create(oligoObject)
      .then(returnedOligo => {
        setOligos(oligos.concat(returnedOligo))
        setNewOligo("Enter oligonucleotid")
      })
  }

  const updateOligo = (id, newsequence) => {
    const oligo = oligos.find(o => o.id === id)
    const changedOligo = {...oligo, sequence: newsequence}

    oligoService
      .update(id, changedOligo)
      .then(returnedOligo =>{
        setOligos(oligos.map(oligo => oligo.id !== id ? oligo : returnedOligo))
      })
      .catch(error => {
        alert(`oligo '${oligo.sequence} was already deleted from server`)
        setOligos(oligos.filter(n=>n.id !== id))
      })
  }

  const deleteOligo = id => {
    const oligo = oligos.find(o => o.id === id)
    if(window.confirm(`do you want delete oligo with ID: ${id} and sequence: ${oligo.sequence}?`)){
      oligoService
        .remove(id)
        .then(()=>setOligos(oligos.filter(n => n.id !== id)))
        .catch(error => {
          alert(`oligo '${oligo.sequence} was already deleted from server`)
          setOligos(oligos.filter(n=>n.id !== id))
        })
    }
  }
  
  const handleOligoChange = (event) => {
    console.log(event.target.value)
    setNewOligo(event.target.value.toUpperCase())
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value.toUpperCase())
  }

  

  const oligosToShow = showAll
    ? oligos
    : oligos.filter(oligo=>oligo.sequence.includes(newSearch) )

  return (
    <div>
      <h1>Oligos</h1>
      <Filter ipValue={newSearch} ipOnChange={handleSearchChange}/>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'filter OFF, click to activate' : 'FILTER ON, click to deactivate'}
      </button>
      <Oligos oligosToShow = {oligosToShow} editOligo ={updateOligo} deleteOligo = {deleteOligo} />
      <AddOligoForm onSubmit={addOligo} ipValue={newOligo} ipOnChange={handleOligoChange}/>
    </div>
  )
}

export default App;
