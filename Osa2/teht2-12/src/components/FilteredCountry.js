import React from 'react'

// renderöi yksittäisen maan tiedot
const FilteredCountry = (props) => {
  return (
    <div>
        <h1>{props.filteredCountries[0].name}</h1>
        <p>
          capital: {props.filteredCountries[0].capital}
        </p>        
        <p>
          population: {props.filteredCountries[0].population}
        </p>        
        <img src={props.filteredCountries[0].flag} alt="flag" width="25%" height="25%" />
    </div>    
  )  
}

export default FilteredCountry