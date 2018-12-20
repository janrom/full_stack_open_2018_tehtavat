import React from 'react';
import axios from 'axios';
import FilteredCountries from './components/FilteredCountries'
import FilteredCountry from './components/FilteredCountry'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filteredCountries: [],
      flagUrl: ''  
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

  // suodata kaikista maista input-arvon mukaisesti
  handleFilteredCountries(event) {
    const filtered = this.state.countries.filter( country => country.name.toLowerCase().includes(event.target.value) )
    
    this.setState({ filteredCountries: filtered })    
  }
  
  // suodata maa nimellä, klikkaamalla jo filteröidystä listasta
  countryClickListener = (name) => {
    const filtered = this.state.filteredCountries.filter( country => country.name === name)    
    
    this.setState({ filteredCountries: filtered })    
  }
  
  render() {
    // valitse näytetäänkö yhden maan tiedot vai filtteröity nimilista maista
    const countries = this.state.filteredCountries.length === 1 ? 
      <FilteredCountry filteredCountry={this.state.filteredCountries[0]} /> :
      <FilteredCountries filteredCountries={this.state.filteredCountries} countryClickListener={this.countryClickListener.bind(this)} />

    return (
      <div>
        <div>
          find countries: <input onChange={this.handleFilteredCountries.bind(this)} />
        </div>
        <div>          
          {countries}
        </div>
      </div>
    );
  }
}

export default App;
