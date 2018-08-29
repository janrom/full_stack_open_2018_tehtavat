import React from 'react';
import ReactDOM from 'react-dom';

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
      <Osa aihe = 'Reactin perusteet' tehtavia = {10} />
      <Osa aihe = 'Tiedonvälitys propseilla' tehtavia = {7} />
      <Osa aihe = 'Komponenttien tila' tehtavia = {14} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.aihe} {props.tehtavia}</p>
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
  return (
    <div>
      <Otsikko kurssi = 'Half Stack -sovelluskehitys'/>
      <Sisalto  />
      <Yhteensa tehtavia1 = {10} tehtavia2 = {7} tehtavia3 = {14}/>      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))