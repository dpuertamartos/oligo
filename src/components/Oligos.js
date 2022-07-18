import React from 'react'
import {useState, useEffect, useRef} from 'react'
import Oligo from './Oligo'
import Togglable from './Togglable'
import AddOligoForm from './AddOligoForm'
import Filter from './Filter'
import filter from '../logic/filter'
import { createOligo, removeOligo, editOligo } from '../reducers/oligoReducer'
import { appendType, deleteType, changeSearch } from '../reducers/filterReducer'
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
    
    const handleFilterChange = (key) => {
      if(filterstate.type.includes(key)){
        dispatch(deleteType(key))
      }
      else{
        dispatch(appendType(key))
      }
      console.log(filterstate)
    }
    
    const oligoFormRef = useRef()

    const handleSearchChange1 = (event) => {
        console.log(event.target.value)
        dispatch(changeSearch({pos:0,change:event.target.value.toUpperCase()}

        ))
        console.log(filterstate.search)
      }
    
      const handleSearchChange2 = (event) => {
        console.log(event.target.value)
        dispatch(changeSearch({pos:1,change:event.target.value.toUpperCase()}

        ))
        console.log(filterstate.search)
    }
    
    const handleSearchChange3 = (event) => {
      console.log(event.target.value)
      dispatch(changeSearch({pos:2,change:event.target.value.toUpperCase()}

      ))
      console.log(filterstate.search)
      
    }

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
        <div className="container-fluid filterForm">
          <div className ="row">
              <div className="col">
              <Filter ipValue={filterstate.search[0]} ipOnChange={handleSearchChange1}/>
              </div>
              <div className="col d-grid gap-2">
              <button type="button" className={`btn${filterstate.type.includes("sequence") ? "" : "-outline"}-success`} onClick={() => handleFilterChange("sequence")}>
                  {filterstate.type.includes("sequence") ? 'seq filter ON' : 'seq filter OFF'}
              </button>   
              </div>
          </div>
          <div className ="row">
            <div className="col">
            <Filter ipValue={filterstate.search[1]} ipOnChange={handleSearchChange2}/>  
            </div>
            <div className="col d-grid gap-2">
            <button type="button" className={`btn${filterstate.type.includes("gene") ? "" : "-outline"}-success`} onClick={() => handleFilterChange("gene")}>
                {filterstate.type.includes("gene") ? 'gene filter ON' : 'gene filter OFF'}
            </button>  
            </div>
          </div>
          <div className ="row">
            <div className="col">
              <Filter ipValue={filterstate.search[2]} ipOnChange={handleSearchChange3}/>
            </div>
            <div className="col d-grid gap-2">
              <button type="button" className={`btn${filterstate.type.includes("plasmid") ? "" : "-outline"}-success`} onClick={() => handleFilterChange("plasmid")}>
                {filterstate.type.includes("plasmid") ? 'plasmid filter ON' : 'plasmid filter OFF'}
              </button>
            </div>
          </div>
        </div>
        <ul>
            {oligosToShow.map(oligo => 
            <Oligo key={oligo.id} oligo={oligo} editOligo={updateOligo} deleteOligo={deleteOligo} />
            )}
        </ul>
        </div>
    )}

export default Oligos