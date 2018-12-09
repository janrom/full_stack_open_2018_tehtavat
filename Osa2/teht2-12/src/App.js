import React from 'react';
import axios from 'axios';
import Countries from './components/Countries'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filteredCountries: []      
    }
  }

  // hae kaikkien maiden tiedot
  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  // suodata kaikista maista input arvon mukaisesti
  handleFilteredCountries(event) {
    const filtered = this.state.countries.filter( country => country.name.toLowerCase().includes(event.target.value) )
    
    this.setState({ filteredCountries: filtered })    
  }
  
  render() {
    return (
      <div>
        <div>
          find countries: <input onChange={this.handleFilteredCountries.bind(this)} />
        </div>
        <div>          
          <Countries filteredCountries={this.state.filteredCountries} />
        </div>
      </div>
    );
  }
}

export default App;
