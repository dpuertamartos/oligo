import { useState } from 'react'

const App = () => {
  const [oligos, setOligos] = useState([])
  const [newOligo, setNewOligo] = useState("Enter oligonucleotid")

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
    setNewOligo(event.target.value)
  }

  return (
    <div>
      <h1>Oligos</h1>
      <ul>
        {oligos.map(oligo => 
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
