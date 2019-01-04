import React from 'react'

const ShowPersons = (props) => {
  return(
    <table>
      <tbody>
        {props.personArray.map( person => {
          return(
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td> 
            </tr>              
          )
        })}
      </tbody>
    </table>
  )
}

export default ShowPersons