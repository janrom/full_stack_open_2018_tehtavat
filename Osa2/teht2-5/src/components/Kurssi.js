import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'

const Kurssi = (props) => {  
  return (
    <div>
      <Otsikko kurssi={props.kurssi.nimi} />
      <Sisalto osat={props.kurssi.osat} />
    </div>    
  )
}

export default Kurssi
