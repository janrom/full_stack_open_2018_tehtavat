import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: '' // ottaa vastaan lomakkeen input-kentän arvon
    }
  }

  // lisää lomakkeella lähetetyn nimen persons-taulukkoon
  addPerson = (event) => {
    event.preventDefault()

    // luo uusi alkio
    const newPerson = {      
      name: this.state.newName
    }
    
    // liitä uusi alkio ja olemassaoleva taulukko
    const persons = this.state.persons.concat(newPerson)

    // aseta luotu taulukko persons-taulukon arvoksi
    this.setState({
      persons,
      newName: ''
    })

    // tyhjennä input-kenttä
    document.getElementById('nimi').value = ''    
  }

  // päivittää lomakkeen input-kentän arvon luokan tila-objektiin
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })    
  }

  // tarkistaa onko input-kentän arvo persons-taulukossa tai onko syöte tyhjä ja estää lisäämisen, jos on
  validateInput = (event) => {
    const match = this.state.persons.filter(person => person.name === this.state.newName)
    if (match.length > 0 || this.state.newName.length === 0) {
      event.preventDefault()
      alert('Henkilö on jo luettelossa tai nimi ei ole kelvollinen')
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input id="nimi" onChange={this.handleNameChange}/>
          </div>
          <div>
            <button type="submit" onClick={this.validateInput}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map( person => <li key={person.name}>{person.name}</li> )}
        </ul>
      </div>
    )
  }
}

export default App;
