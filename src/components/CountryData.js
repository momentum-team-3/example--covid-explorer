/* globals fetch */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function CountryData () {
  const [casesByDay, setCasesByDay] = useState([])
  const { slug } = useParams()

  useEffect(() => {
    fetch('https://api.covid19api.com/dayone/country/' + slug + '/status/confirmed')
      .then(res => res.json())
      .then(data => setCasesByDay(data))
  }, [slug])

  let name = slug
  if (casesByDay.length > 0) {
    name = casesByDay[0].Country
  }

  return (
    <div className='CountryData'>
      <h2>{name}</h2>
      <ul>
        {casesByDay.map((record, idx) => (
          <li key={idx}>
            <div><strong>Date:</strong> {record.Date}</div>
            {record.Province && <div><strong>Province:</strong> {record.Province}</div>}
            <div><strong>Confirmed Cases:</strong> {record.Cases}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountryData
