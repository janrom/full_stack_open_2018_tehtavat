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
      persons, // ES6-syntaksi. voi lyhentää näin, jos arvoksi asetettava objekti saman niminen kuin luokan tila-objektin nimi
      newName: ''
    })
  }

  // päivittää lomakkeen input-kentän arvon luokan tila-objektiin
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })    
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input onChange={this.handleNameChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
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
