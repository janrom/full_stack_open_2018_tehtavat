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
      <Osa aihe = {props.osa1.nimi} tehtavia = {props.osa1.tehtavia} />
      <Osa aihe = {props.osa2.nimi} tehtavia = {props.osa2.tehtavia} />
      <Osa aihe = {props.osa3.nimi} tehtavia = {props.osa3.tehtavia} />
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
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} />
      <Yhteensa tehtavia1 = {10} tehtavia2 = {7} tehtavia3 = {14}/>      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
