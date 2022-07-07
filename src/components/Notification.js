import React from "react"

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    
    const txt = message[0]
    const type = message[1]
    let style = {}
    type === "confirmation"
        ? style = {color: "green"}
        : style = {}
    return (
      <div className='error' style={style}>
        {txt}
      </div>
    )
  }

export default Notification