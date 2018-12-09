import React from 'react'

// renderöi lista suodatetuista maista
const FilteredCountries = (props) => {
  return (
    <ul>
      {props.filteredCountries.map(country => <li key={country.alpha3Code}>{country.name}</li> )}
    </ul>   
  )
}

export default FilteredCountries