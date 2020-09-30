import React from 'react'

import { Link } from 'react-router-dom'

function CountryList (props) {
  const { countries } = props

  return (
    <ul>
      {countries.map(country => (
        <li key={country.ISO2}>
          <Link to={`/country/${country.Slug}/`}>
            {country.Country}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default CountryList
