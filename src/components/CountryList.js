import React from 'react'

function CountryList (props) {
  const { countries, onSelect } = props

  return (
    <ul>
      {countries.map(country => (
        <li key={country.ISO2}>
          <button onClick={() => onSelect(country)}>
            {country.Country}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList
