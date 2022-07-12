import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Plasmid from './Plasmid'
import plasmidService from "../services/plasmids"
import Togglable from './Togglable'
import AddPlasmidForm from './AddPlasmidForm'

const Plasmids = ({setErrorMessage, user}) => {
    const [plasmids, setPlasmids] = useState([])

    useEffect(() => {
        plasmidService
          .getAll()
          .then(initialPlasmids => {
            setPlasmids(initialPlasmids)
          })
      }, [])

    const addPlasmid = (plasmidObject) => {
      plasmidFormRef.current.toggleVisibility()
      console.log("adding plasmid", plasmidObject)
      plasmidService
          .create(plasmidObject)
          .then(returnedGene => {
              setPlasmids(plasmids.concat(returnedGene))
              setErrorMessage(
                  [`plasmid ${plasmidObject.name} was added to server`,"confirmation"]
              )
              setTimeout(()=>{setErrorMessage(null)},5000)
          })    
    }
    const deletePlasmid = id => {
      const plasmid = plasmids.find(o => o.id === id)
      if(window.confirm(`do you want delete plasmid with ID: ${id} and name: ${plasmid.name}?`)){
        plasmidService
          .remove(id)
          .then(()=>{
            setPlasmids(plasmids.filter(n => n.id !== id))
            setErrorMessage(
              [`plasmid ${plasmid.name} was deleted from server`,"confirmation"]
            )
          })
          .catch(error => {
            setErrorMessage(
              [`plasmid ${plasmid.name} was already deleted from server`,"error"]
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPlasmids(plasmids.filter(n=>n.id !== id))
          })
      }
    }
    
    const editPlasmid = (id, edit) => console.log("editing plasmid",id,edit)

    
    const plasmidFormRef = useRef()
    const plasmidsToShow = plasmids

    return (
        <div>
        <ul>
            {plasmids.map(p => 
            <Plasmid key={p.id} plasmid={p} deletePlasmid={deletePlasmid} editGene={editPlasmid} />
            )}
        </ul>
        {user !== null &&
          <Togglable buttonLabel="new plasmid" ref={plasmidFormRef}>
              <AddPlasmidForm
              createPlasmid={addPlasmid}
              />
          </Togglable>
        }
        </div>
    )}

export default Plasmids