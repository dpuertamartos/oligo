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
      id: oligos.length + 1,
      sequence: newOligo,
    }

    oligoService
      .create(oligoObject)
      .then(returnedOligo => {
        setOligos(oligos.concat(returnedOligo))
        setNewOligo("Enter oligonucleotid")
      })
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
      <Oligos oligosToShow = {oligosToShow} />
      <AddOligoForm onSubmit={addOligo} ipValue={newOligo} ipOnChange={handleOligoChange}/>
    </div>
  )
}

export default App;
