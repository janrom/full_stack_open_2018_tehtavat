import React from 'react'
import FilteredCountries from './FilteredCountries'
import FilteredCountry from './FilteredCountry';

// valitsee komponentin, joka renderöidään, riippuen suodatettujen maiden lukumäärästä
function Countries(props) {
  if (props.filteredCountries.length === 1) {
    return <FilteredCountry filteredCountries={props.filteredCountries} />
  }
  else if (props.filteredCountries.length > 1 && props.filteredCountries.length <= 10) {
    return <FilteredCountries filteredCountries={props.filteredCountries} />
  }

  return 'Too many matches, please specify another filter'
}

export default Countries