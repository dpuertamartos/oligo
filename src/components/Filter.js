import React from 'react'

const Filter = ({ipValue, ipOnChange}) => 
<input value={ipValue} onChange={ipOnChange} className="form-control"/>

export default Filter