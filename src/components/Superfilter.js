import React from 'react'
import Filter from './Filter'
import { appendTypeOligo, deleteTypeOligo, changeSearchOligo,
  appendTypeGene, deleteTypeGene, changeSearchGene,
  appendTypePlasmid, deleteTypePlasmid, changeSearchPlasmid } from '../reducers/filterReducer'
import { useSelector, useDispatch } from 'react-redux'

const Superfilter = ({filterstate, appendType, deleteType, changeSearch}) => {
    const dispatch = useDispatch()
    
    const handleFilterChange = (key) => {
      if(filterstate.type.includes(key)){
        dispatch(deleteType(key))
      }
      else{
        dispatch(appendType(key))
      }
      console.log(filterstate)
    }

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

    return (
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
    )}

export default Superfilter