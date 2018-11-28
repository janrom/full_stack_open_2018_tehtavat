import React from 'react';
import FilterPerson from './components/FilterPerson'
import AddPerson from './components/AddPerson'
import ShowPersons from './components/ShowPersons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      filteredPersons: [],
      newName: '',
      newPhoneNumber: '',
    }
  }

  // lisää lomakkeella lähetetyn nimen persons-taulukkoon
  addPerson = (event) => {
    event.preventDefault()

    // luo uusi alkio
    const newPerson = {      
      name: this.state.newName,
      phoneNumber: this.state.newPhoneNumber
    }
    
    // liitä uusi alkio ja olemassaoleva taulukko
    const persons = this.state.persons.concat(newPerson)

    // aseta luotu taulukko persons-taulukon arvoksi
    this.setState({
      persons,
      newName: '',
      newPhoneNumber: ''
    })

    // tyhjennä input-kentät
    document.getElementById('name').value = ''
    document.getElementById('phonenumber').value = ''
  }
  
  // päivittää lomakkeen input-kentän arvon luokan tila-objektiin
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })    
  }

  handleTelChange = (event) => {
    this.setState({ newPhoneNumber: event.target.value })
  }

  // luo taulukko suodatetuista henkilöistä ja aseta se tila-objektin arvoksi
  handleFilteredPersons = (event) => {
    const filtered = this.state.persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))

    this.setState({ filteredPersons: filtered })
  }

  // tarkista onko saman niminen henkilö jo luettelossa tai onko syöte tyhjä. jos jompikumpi tosi, estä lisääminen
  validateInput = (event) => {
    const nameMatch = this.state.persons.filter(person => person.name === this.state.newName)
    if (nameMatch.length > 0 || this.state.newName.length === 0) {
      event.preventDefault()
      alert('Henkilö on jo luettelossa tai nimi ei ole kelvollinen')
    }    
  }
  
  render() {
    // valitse näytetäänkö koko luettelo vai suodatettu luettelo
    const personArray = this.state.filteredPersons.length === 0 ? this.state.persons : this.state.filteredPersons
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <FilterPerson handleFilteredPersons={this.handleFilteredPersons.bind(this)} />
        <h2>Lisää uusi</h2>
        <AddPerson addPerson={this.addPerson.bind(this)} handleNameChange={this.handleNameChange.bind(this)} handleTelChange={this.handleTelChange.bind(this)} 
          validateInput={this.validateInput.bind(this)} />
        <h2>Numerot</h2>
        <ShowPersons personArray={personArray} />
      </div>
    )
  }
}

export default App;
