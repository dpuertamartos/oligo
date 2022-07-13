import React from 'react'
import { useRef } from 'react'
import Plasmid from './Plasmid'
import Togglable from './Togglable'
import AddPlasmidForm from './AddPlasmidForm'
import { createPlasmid } from '../reducers/plasmidReducer'
import { useSelector, useDispatch } from 'react-redux'

const Plasmids = ({setErrorMessage, user}) => {
  const dispatch = useDispatch()
  const plasmids = useSelector(state => state.plasmids)
  
  const addPlasmid = (plasmidObject) => {
      plasmidFormRef.current.toggleVisibility()
      console.log("adding gene", plasmidObject)
      dispatch(createPlasmid(plasmidObject))
      setErrorMessage(
          [`plasmid ${plasmidObject.name} was added to server`,"confirmation"]
      )
      setTimeout(()=>{setErrorMessage(null)},5000)    
  }

    const deletePlasmid = id => {
      console.log("editing plasmid",id)
      /* const plasmid = plasmids.find(o => o.id === id)
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
      } */
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