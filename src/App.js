import { useState, useEffect } from 'react'
import oligoService from './services/oligos'
import Oligos from './components/Oligos'
import Filter from './components/Filter'
import AddOligoForm from './components/AddOligoForm'
import Notification from './components/Notification'


const App = () => {
  const [oligos, setOligos] = useState([])
  const [newOligo, setNewOligo] = useState("Enter oligonucleotid")
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState("Search sequence")
  const [errorMessage, setErrorMessage] = useState(null)
  

  useEffect(() => {
    oligoService
      .getAll()
      .then(initialOligos => {
        setOligos(initialOligos)
      })
  }, [])

  const addOligo = (event) => {
    event.preventDefault()
    let new_id = 1
    oligos.length === 0
      ? new_id = 1
      : new_id = oligos[oligos.length-1].id + 1

    const oligoObject = {
      id: new_id,
      sequence: newOligo,
    }

    oligoService
      .create(oligoObject)
      .then(returnedOligo => {
        setOligos(oligos.concat(returnedOligo))
        setNewOligo("Enter oligonucleotid")
        setErrorMessage(
          [`oligo ${oligoObject.sequence} was added to server`,"confirmation"]
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
        setErrorMessage(
          [`oligo ${oligo.sequence} was already deleted from server`,"error"]
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setOligos(oligos.filter(n=>n.id !== id))
      })
  }

  const deleteOligo = id => {
    const oligo = oligos.find(o => o.id === id)
    if(window.confirm(`do you want delete oligo with ID: ${id} and sequence: ${oligo.sequence}?`)){
      oligoService
        .remove(id)
        .then(()=>{
          setOligos(oligos.filter(n => n.id !== id))
          setErrorMessage(
            [`oligo ${oligo.sequence} was deleted from server`,"confirmation"]
          )
        })
        .catch(error => {
          setErrorMessage(
            [`oligo ${oligo.sequence} was already deleted from server`,"error"]
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
      <Notification message={errorMessage} />
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
