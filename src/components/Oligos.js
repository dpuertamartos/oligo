import React from 'react'
import {useRef} from 'react'
import Oligo from './Oligo'
import Togglable from './Togglable'
import AddOligoForm from './AddOligoForm'
import Superfilter from './Superfilter'
import filter from '../logic/filter'
import { createOligo, removeOligo, editOligo } from '../reducers/oligoReducer'
import { useSelector, useDispatch } from 'react-redux'

const Oligos = ({user}) => {
    const dispatch = useDispatch()
    const oligos = useSelector(state => state.oligos)
    const filterstate = useSelector(state => state.filter)
    
    const addOligo = (oligoObject) => {
      oligoFormRef.current.toggleVisibility()
      dispatch(createOligo(oligoObject))
    }  

    const updateOligo = (id, newsequence) => {
      console.log("updateOligo",id)
      const oligo = oligos.find(o=>o.id===id)
      dispatch(editOligo({...oligo, sequence: newsequence}))

    }
    
    const deleteOligo = id => {
      console.log("delete Oligo", id)
      
      const oligo = oligos.find(o => o.id === id)
      if(window.confirm(`do you want delete oligo with ID: ${id} and sequence: ${oligo.sequence}?`)){
        dispatch(removeOligo(id))
      } 
    }
    
    const oligoFormRef = useRef()

    const oligosToShow = filter(oligos, filterstate.type, filterstate.search)

    return (
        <div>
          <div><span className="titleSection">Oligos </span>
          <span>
              {user !== null &&
              <Togglable buttonLabel="new oligo" ref={oligoFormRef}>
                  <AddOligoForm
                  createOligo={addOligo}
                  />
              </Togglable>
              }
            </span>
          </div>
        <Superfilter />
        <ul>
            {oligosToShow.map(oligo => 
            <Oligo key={oligo.id} oligo={oligo} editOligo={updateOligo} deleteOligo={deleteOligo} />
            )}
        </ul>
        </div>
    )}

export default Oligos