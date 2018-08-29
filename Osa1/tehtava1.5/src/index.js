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
      <Osa aihe = {props.osat[0].nimi} tehtavia = {props.osat[0].tehtavia} />
      <Osa aihe = {props.osat[1].nimi} tehtavia = {props.osat[1].tehtavia} />
      <Osa aihe = {props.osat[2].nimi} tehtavia = {props.osat[2].tehtavia} />
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
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }
  
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa tehtavia1 = {10} tehtavia2 = {7} tehtavia3 = {14}/>      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))