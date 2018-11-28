import React from 'react'
import Osa from './Osa'
import Yhteensa from './Yhteensa'

const Sisalto = ({osat}) => {
  return (    
    <div>
      <div>        
        {osat.map( osa => <Osa key={osa.id} aihe={osa.nimi} tehtavia={osa.tehtavia} /> )}        
      </div>
      <Yhteensa summa={ osat.reduce( (previous, current) => previous + current.tehtavia, 0 )} 
      />
    </div>    
  )
}

export default Sisalto