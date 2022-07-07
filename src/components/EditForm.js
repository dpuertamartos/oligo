import React from "react"

const EditForm = ({onSubmit,ipValue,ipOnChange}) => {
    return(
      <form onSubmit={onSubmit}>
        <input value={ipValue} onChange={ipOnChange}/>
        <button type="submit">Confirm edit</button>
      </form>
    )
}

export default EditForm