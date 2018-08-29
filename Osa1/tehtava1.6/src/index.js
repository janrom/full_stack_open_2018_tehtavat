import React from 'react';
import ReactDOM from 'react-dom';

class Palaute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }   
    this.kasvataHyva = this.kasvataHyva.bind(this)
    this.kasvataNeutraali = this.kasvataNeutraali.bind(this)
    this.kasvataHuono = this.kasvataHuono.bind(this)
  }  

  kasvataHyva() {
    this.setState((prevState) => ({
      hyva: prevState.hyva + 1
    }))
  }

  kasvataNeutraali() {
    this.setState((prevState) => ({
      neutraali: prevState.neutraali + 1
    }))
  }

  kasvataHuono() {
    this.setState((prevState) => ({
      huono: prevState.huono + 1
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
      </div>
    )    
  }
}

ReactDOM.render(
  <Palaute />,
  document.getElementById('root')
)