import { useState } from 'react'

const App = () => {
  const [oligos, setOligos] = useState([
    { id: 1, sequence: "ATTAGC" },
    { id: 2, sequence: "GCGCAA"  },
    { id: 3, sequence: "TTAAGG"  },
    { id: 4, sequence: "CCATGG"  }
  ])
  const [newOligo, setNewOligo] = useState("Enter oligonucleotid")
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState("Search oligo")

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
      <input value={newSearch} onChange={handleSearchChange}/>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'filter mode' : 'show all'}
      </button>
      <ul>
        {oligosToShow.map(oligo => 
          <li key={oligo.id}>{oligo.sequence}</li>
        )}
      </ul>
      <form onSubmit={addOligo}>
        <input value={newOligo} onChange={handleOligoChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;
