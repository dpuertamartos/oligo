import React from 'react'
import { useRef } from 'react'
import Plasmid from './Plasmid'
import Togglable from './Togglable'
import AddPlasmidForm from './AddPlasmidForm'
import { createPlasmid, removePlasmid, updatePlasmid } from '../reducers/plasmidReducer'
import Superfilter from './Superfilter'
import { useSelector, useDispatch } from 'react-redux'

const Plasmids = ({user}) => {
  const dispatch = useDispatch()
  const plasmids = useSelector(state => state.plasmids)
  
  const addPlasmid = (plasmidObject) => {
      plasmidFormRef.current.toggleVisibility()
      console.log("adding gene", plasmidObject)
      dispatch(createPlasmid(plasmidObject))
         
  }

    const deletePlasmid = id => {
      const plasmid = plasmids.find(o => o.id === id)
      if(window.confirm(`do you want delete plasmid with ID: ${id} and name: ${plasmid.name}?`)){
        dispatch(removePlasmid(id))
      } 
    }
    
    const editPlasmid = (id, edit) => {
      console.log("editing", id)
      const plasmid = plasmids.find(o=>o.id===id)
      dispatch(updatePlasmid({...plasmid, name:edit}))
    }

    
    const plasmidFormRef = useRef()
    const plasmidsToShow = plasmids

    return (
        <div>
          <div><span className="titleSection">Plasmids </span>
          <span>
            {user !== null &&
            <Togglable buttonLabel="new plasmid" ref={plasmidFormRef}>
                <AddPlasmidForm
                createPlasmid={addPlasmid}
                />
            </Togglable>
            }
          </span>
          </div>
        <Superfilter />
        <ul>
            {plasmids.map(p => 
            <Plasmid key={p.id} plasmid={p} deletePlasmid={deletePlasmid} editPlasmid={editPlasmid} />
            )}
        </ul>
        </div>
    )}

export default Plasmids