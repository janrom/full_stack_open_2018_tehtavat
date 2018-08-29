import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {  
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <p>{props.osa1} {props.tehtavia1}</p>
      <p>{props.osa2} {props.tehtavia2}</p>
      <p>{props.osa3} {props.tehtavia3}</p>        
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteensä {props.tehtavia1 + props.tehtavia2 + props.tehtavia3} tehtävää</p>
    </div>  
  )
}

const App = () => {
  const t1 = 10
  const t2 = 7
  const t3 = 14
  return (
    <div>
      <Otsikko kurssi = 'Half Stack -sovelluskehitys'/>
      <Sisalto osa1 = 'Reactin perusteet' tehtavia1 = {t1} osa2 = 'Tiedonvälitys propseilla' tehtavia2 = {t2} osa3 = 'Komponenttien tila' tehtavia3 = {t3}/>
      <Yhteensa tehtavia1 = {t1} tehtavia2 = {t2} tehtavia3 = {t3}/>      
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
