import React from 'react';
import ReactDOM from 'react-dom';

class Palaute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      keskiarvo: 0,
      positiivisia: 0
    }   
    this.kasvataHyva = this.kasvataHyva.bind(this)
    this.kasvataNeutraali = this.kasvataNeutraali.bind(this)
    this.kasvataHuono = this.kasvataHuono.bind(this)
  }  

  kasvataHyva() {
    this.setState((prevState) => ({
      hyva: prevState.hyva + 1
    }))
    this.laskeKeskiarvo()
    this.laskePositiivisienOsuus()
  }

  kasvataNeutraali() {
    this.setState((prevState) => ({
      neutraali: prevState.neutraali + 1
    }))
    this.laskeKeskiarvo()
    this.laskePositiivisienOsuus()
  }

  kasvataHuono() {
    this.setState((prevState) => ({
      huono: prevState.huono + 1
    }))
    this.laskeKeskiarvo()
    this.laskePositiivisienOsuus()
  }
  
  laskeKeskiarvo() {
    this.setState((prevState) => ({
      keskiarvo: Math.round( (prevState.hyva + (prevState.neutraali * 0) + (prevState.huono * -1)) / (prevState.hyva + prevState.neutraali + prevState.huono) * 10) / 10
    }))
  }

  laskePositiivisienOsuus() {
    this.setState((prevState) => ({
      positiivisia: Math.round( (prevState.hyva / (prevState.hyva + prevState.neutraali + prevState.huono) * 100) * 10) / 10
    }))
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
        <button onClick={this.kasvataHyva}>
          hyvä
        </button>
        <button onClick={this.kasvataNeutraali}>
          neutraali
        </button>
        <button onClick={this.kasvataHuono}>
          huono
        </button>
        <h1>statistiikka</h1>
        <p>hyvä {this.state.hyva}</p>
        <p>neutraali {this.state.neutraali}</p>
        <p>huono {this.state.huono}</p>
        <p>keskiarvo {this.state.keskiarvo}</p>
        <p>positiivisia {this.state.positiivisia} %</p>
      </div>
    )    
  }
}

ReactDOM.render(
  <Palaute />,
  document.getElementById('root')
)