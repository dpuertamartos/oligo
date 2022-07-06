import { useState } from 'react'

const Oligo = ({oligo}) => <li>{oligo.sequence}</li>

const Oligos = ({oligosToShow}) => {return (
  <ul>
    {oligosToShow.map(oligo => 
      <Oligo key={oligo.id} oligo={oligo} />
    )}
  </ul>
)}

const AddOligoForm = ({onSubmit,ipValue,ipOnChange}) => {
  return( 
  <form onSubmit={onSubmit}>
    <input value={ipValue} onChange={ipOnChange}/>
    <button type="submit">save</button>
  </form>
  )
}

const Filter = ({ipValue, ipOnChange}) => 
<input value={ipValue} onChange={ipOnChange}/>


const App = () => {
  const [oligos, setOligos] = useState([
    { id: 1, sequence: "ATTAGC" },
    { id: 2, sequence: "GCGCAA"  },
    { id: 3, sequence: "TTAAGG"  },
    { id: 4, sequence: "CCATGG"  }
  ])
  const [newOligo, setNewOligo] = useState("Enter oligonucleotid")
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState("Search sequence")

  const addOligo = (event) => {
    event.preventDefault()
    const oligoObject = {
      id: oligos.length + 1,
      sequence: newOligo,
    }

    setOligos(oligos.concat(oligoObject))
    setNewOligo("Enter oligonucleotid")

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
