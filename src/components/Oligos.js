import React from 'react'
import {useState, useEffect, useRef} from 'react'
import Oligo from './Oligo'
import Togglable from './Togglable'
import AddOligoForm from './AddOligoForm'
import Filter from './Filter'
import filter from '../logic/filter'
import { createOligo, removeOligo, editOligo } from '../reducers/oligoReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const Oligos = ({user}) => {
    const dispatch = useDispatch()
    const oligos = useSelector(state => state.oligos)
    
    const [newSearch, setNewSearch] = useState(["Search sequence","Search gene","Search plasmid"])
    const [filterType, setFilterType] = useState([])

    
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
      if(filterType.includes(key)){
        setFilterType(filterType.filter(k => k !== key))
      }
      else{
        setFilterType(filterType.concat(key))
      }
      console.log(filterType)
    }
    
    const oligoFormRef = useRef()

    const handleSearchChange1 = (event) => {
        console.log(event.target.value)
        setNewSearch(newSearch.map((item,index) => {
          if(index!==0){return item}
          else{return event.target.value.toUpperCase()}
        }))
        console.log(newSearch)
      }
    
      const handleSearchChange2 = (event) => {
        console.log(event.target.value)
        setNewSearch(newSearch.map((item,index) => {
          if(index!==1){return item}
          else{return event.target.value.toUpperCase()}
        }))
        console.log(newSearch)
    }
    
    const handleSearchChange3 = (event) => {
      console.log(event.target.value)
      setNewSearch(newSearch.map((item,index) => {
        if(index!==2){return item}
        else{return event.target.value.toUpperCase()}
      }))
      console.log(newSearch)
    }

    const oligosToShow = filter(oligos, filterType, newSearch)

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
              <Filter ipValue={newSearch[0]} ipOnChange={handleSearchChange1}/>
              </div>
              <div className="col d-grid gap-2">
              <button type="button" className={`btn${filterType.includes("sequence") ? "" : "-outline"}-success`} onClick={() => handleFilterChange("sequence")}>
                  {filterType.includes("sequence") ? 'seq filter ON' : 'seq filter OFF'}
              </button>   
              </div>
          </div>
          <div className ="row">
            <div className="col">
            <Filter ipValue={newSearch[1]} ipOnChange={handleSearchChange2}/>  
            </div>
            <div className="col d-grid gap-2">
            <button type="button" className={`btn${filterType.includes("gene") ? "" : "-outline"}-success`} onClick={() => handleFilterChange("gene")}>
                {filterType.includes("gene") ? 'gene filter ON' : 'gene filter OFF'}
            </button>  
            </div>
          </div>
          <div className ="row">
            <div className="col">
              <Filter ipValue={newSearch[2]} ipOnChange={handleSearchChange3}/>
            </div>
            <div className="col d-grid gap-2">
              <button type="button" className={`btn${filterType.includes("plasmid") ? "" : "-outline"}-success`} onClick={() => handleFilterChange("plasmid")}>
                {filterType.includes("plasmid") ? 'plasmid filter ON' : 'plasmid filter OFF'}
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