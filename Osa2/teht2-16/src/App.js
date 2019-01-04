import React from 'react';
import FilterPerson from './components/FilterPerson'
import AddPerson from './components/AddPerson'
import ShowPersons from './components/ShowPersons'
import personService from './services/person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filteredPersons: [],
      newName: '',
      newNumber: '',
    }
  }

  // lataa data json-palvelimelta ja aseta komponentin tilaksi
  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
      .catch('Valitettavasti kontaktien hakeminen palvelimelta epaonnistui')
  }

  // lisää lomakkeella lähetetyn nimen persons-taulukkoon
  addPerson = (event) => {
    event.preventDefault()

    // luo uusi alkio
    const newPerson = {      
      name: this.state.newName,
      number: this.state.newNumber
    }

    // lisaa uusi kontakti palvelimelle ja lisaa palvelimen vastaus tila-komponenttiin
    personService
      .create(newPerson)
      .then(response => {        
        this.setState({ 
          persons: this.state.persons.concat(response),
          newName: '',
          newNumber: ''
        })
      })
      .catch(error => alert('Valitettavasti kontaktin lisaaminen epaonnistui'))
    
    // tyhjennä input-kentät
    document.getElementById('name').value = ''
    document.getElementById('phonenumber').value = ''
  }

  // poista kontakti palvelimelta ja paivita komponentin tila seka clientin nakyma
  removePerson = (event) => {   
    personService
      .remove(event)
      .then(response => personService.getAll())
      .then(response => this.setState({ persons: response }))
      .catch(error => alert('Valitettavasti poistaminen epaonnistui'))   
  }
  
  // päivittää lomakkeen input-kentän arvon luokan tila-objektiin
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })    
  }

  handleNumChange = (event) => {
    this.setState({ newNumber: event.target.value })
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
        <AddPerson addPerson={this.addPerson.bind(this)} handleNameChange={this.handleNameChange.bind(this)} handleNumChange={this.handleNumChange.bind(this)} 
          validateInput={this.validateInput.bind(this)} />
        <h2>Numerot</h2>
        <ShowPersons personArray={personArray} removePerson={this.removePerson}/>
      </div>
    )
  }
}

export default App;
