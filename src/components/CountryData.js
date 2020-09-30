/* globals fetch */
import React from 'react'

class CountryData extends React.Component {
  constructor () {
    super()
    this.state = {
      casesByDay: []
    }
  }

  componentDidMount () {
    const slug = this.props.match.params.slug
    fetch('https://api.covid19api.com/dayone/country/' + slug + '/status/confirmed')
      .then(res => res.json())
      .then(data => this.setState({ casesByDay: data }))
  }

  render () {
    const records = this.state.casesByDay
    let name = this.props.match.params.slug
    if (records.length > 0) {
      name = records[0].Country
    }

    return (
      <div className='CountryData'>

        <h2>{name}</h2>
        <ul>
          {records.map((record, idx) => (
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
}

export default CountryData
