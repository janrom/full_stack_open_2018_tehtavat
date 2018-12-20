import React from 'react'

// renderöi yksittäisen maan tiedot
const FilteredCountry = (props) => {
  return (
    <div>
        <h1>{props.filteredCountry.name}</h1>
        <p>
          capital: {props.filteredCountry.capital}
        </p>        
        <p>
          population: {props.filteredCountry.population}
        </p>        
        <img src={props.filteredCountry.flag} alt="flag" width="25%" height="25%" />
    </div>    
  )  
}

export default FilteredCountry