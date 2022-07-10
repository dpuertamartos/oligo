import React from 'react'
import {useState, useEffect, useRef} from 'react'
import oligoService from '../services/oligos'
import Oligo from './Oligo'
import Togglable from './Togglable'
import AddOligoForm from './AddOligoForm'
import Filter from './Filter'

const Oligos = ({setErrorMessage, user}) => {
    const [oligos, setOligos] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [newSearch, setNewSearch] = useState("Search sequence")

    useEffect(() => {
        oligoService
          .getAll()
          .then(initialOligos => {
            setOligos(initialOligos)
          })
      }, [])
    
    const addOligo = (oligoObject) => {
    oligoFormRef.current.toggleVisibility()
    oligoService
        .create(oligoObject)
        .then(returnedOligo => {
        setOligos(oligos.concat(returnedOligo))
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
    
    const oligosToShow = showAll
      ? oligos
      : oligos.filter(oligo=>oligo.sequence.includes(newSearch) )
  
    const oligoFormRef = useRef()

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setNewSearch(event.target.value.toUpperCase())
      }

    return (
        <div>
        <Filter ipValue={newSearch} ipOnChange={handleSearchChange}/>
        <button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'filter OFF, click to activate' : 'FILTER ON, click to deactivate'}
        </button>
        <ul>
            {oligosToShow.map(oligo => 
            <Oligo key={oligo.id} oligo={oligo} editOligo={updateOligo} deleteOligo={deleteOligo} />
            )}
        </ul>
        {user !== null &&
        <Togglable buttonLabel="new oligo" ref={oligoFormRef}>
            <AddOligoForm
            createOligo={addOligo}
            />
        </Togglable>
        }
        </div>
    )}

export default Oligos