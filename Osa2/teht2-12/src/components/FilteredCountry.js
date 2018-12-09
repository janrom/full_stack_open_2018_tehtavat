import React from 'react'

// renderöi yksittäisen maan tiedot
const FilteredCountry = (props) => {
  return (
    <div>
      <div>
        capital: {props.filteredCountries.capital}
      </div>
      <div>
        population: {props.filteredCountries.population}
      </div>
      <div>
        <img src={props.filteredCountries.flag} alt="flag" />
      </div>
    </div>    
  )  
}

export default FilteredCountry