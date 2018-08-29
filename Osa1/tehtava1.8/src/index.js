import React from 'react';
import ReactDOM from 'react-dom';

function Statistic(props) {
  return <div>{props.nimi} {props.arvo}</div>  
}

function Button(props) {
  return <button onClick={props.tapahtuma}>{props.nimi}</button>  
}

class Statistics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      keskiarvo: 0,
      positiivisia: 0,      
    }    
    this.lisaaPalaute = this.lisaaPalaute.bind(this)    
  }

  lisaaPalaute(nimi) {
    switch(nimi) {
      case 'hyva':
        this.setState((prevState) => ({ hyva: prevState.hyva + 1 }))
        break;
      case 'neutraali':
        this.setState((prevState) => ({ neutraali: prevState.neutraali + 1 }))
        break;
      case 'huono':
        this.setState((prevState) => ({ huono: prevState.huono + 1 }))
        break;
      default:
        break;
    }
    this.laskeKeskiarvo()
    this.laskePositiivisienOsuus()    
  }
  
  laskeKeskiarvo() {
    this.setState((prevState) => ({
      keskiarvo: Math.round( (prevState.hyva + (prevState.neutraali * 0) + (prevState.huono * -1)) / (prevState.hyva + prevState.neutraali + prevState.huono) * 10) / 10
    }))
    return this.state.keskiarvo
  }

  laskePositiivisienOsuus() {
    this.setState((prevState) => ({
      positiivisia: Math.round( (prevState.hyva / (prevState.hyva + prevState.neutraali + prevState.huono) * 100) * 10) / 10
    }))
    return this.state.positiivisia
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
          <Button tapahtuma={() => this.lisaaPalaute('hyva')} nimi='hyvä' />
          <Button tapahtuma={() => this.lisaaPalaute('neutraali')} nimi='neutraali' />
          <Button tapahtuma={() => this.lisaaPalaute('huono')} nimi='huono' />
          <h1>statistiikka</h1>
          <Statistic nimi='hyvä' arvo={this.state.hyva} />
          <Statistic nimi='neutraali' arvo={this.state.neutraali} />
          <Statistic nimi='huono' arvo={this.state.huono} />
          <Statistic nimi='keskiarvo' arvo={this.state.keskiarvo} />
          <Statistic nimi='positiivisia' arvo={this.state.positiivisia} />          
      </div>
    )
  }
}

ReactDOM.render(
  <Statistics />,
  document.getElementById('root')
)