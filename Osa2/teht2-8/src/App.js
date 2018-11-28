import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { 
          name: 'Janne Romppanen',
          phoneNumber: '050123456'
        }
      ],
      newName: '', // saa name-inputkentän arvon
      newPhoneNumber: '' // saa phonenumber-inputkentän arvon
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

  // tarkistaa onko input-kenttien arvot persons-taulukossa tai onko syöte tyhjä ja estää lisäämisen, jos on
  validateInput = (event) => {
    const nameMatch = this.state.persons.filter(person => person.name === this.state.newName)
    if (nameMatch.length > 0 || this.state.newName.length === 0) {
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
            nimi: <input id="name" onChange={this.handleNameChange}/>
          </div>
          <div>
            puhelinumero: <input id="phonenumber" onChange={this.handleTelChange}/>
          </div>
          <div>
            <button type="submit" onClick={this.validateInput}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {this.state.persons.map( person => {
              return(
                <tr key={person.name}>
                  <td>{person.name}</td>
                  <td>{person.phoneNumber}</td> 
                </tr>              
              )              
            })}          
          </tbody>
        </table>          
      </div>
    )
  }
}

export default App;
