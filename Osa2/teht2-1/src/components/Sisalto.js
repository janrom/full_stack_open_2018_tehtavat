import React from 'react'
import Osa from './Osa'

const Sisalto = (props) => {
  return (
    <div>
      <Osa aihe = {props.osat[0].nimi} tehtavia = {props.osat[0].tehtavia} />
      <Osa aihe = {props.osat[1].nimi} tehtavia = {props.osat[1].tehtavia} />
      <Osa aihe = {props.osat[2].nimi} tehtavia = {props.osat[2].tehtavia} />
    </div>
  )
}

export default Sisalto