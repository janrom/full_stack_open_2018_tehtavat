import React from 'react'

const AddPerson = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        nimi: <input id="name" onChange={props.handleNameChange}/>
      </div>
      <div>
        puhelinumero: <input id="phonenumber" onChange={props.handleTelChange}/>
      </div>
      <div>
        <button type="submit" onClick={props.validateInput}>lisää</button>
      </div>
    </form>
  )
}

export default AddPerson
