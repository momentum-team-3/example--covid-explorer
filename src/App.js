/* globals fetch */

import React from 'react'
import './App.css'
import CountryData from './components/CountryData'
import CountryList from './components/CountryList'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedCountry: null,
      countries: []
    }
  }

  componentDidMount () {
    fetch('https://api.covid19api.com/countries')
      .then(response => response.json())
      .then(data => {
        const countries = data.sort(function (a, b) {
          if (a.Country < b.Country) {
            return -1
          } else if (a.Country > b.Country) {
            return 1
          }
          return 0
        })
        this.setState({ countries: countries })
      })
  }

  render () {
    let body
    if (this.state.selectedCountry !== null) {
      body = (
        <div>
          <CountryData
            name={this.state.selectedCountry.Country}
            slug={this.state.selectedCountry.Slug}
          />
          <p>
            <button onClick={() => this.setState({ selectedCountry: null })}>
            Back to country list
            </button>
          </p>
        </div>
      )
    } else {
      body = (
        <CountryList
          countries={this.state.countries}
          onSelect={country => this.setState({ selectedCountry: country })}
        />
      )
    }

    return (
      <div className='App'>
        <h1>COVID Explorer</h1>
        {body}
      </div>
    )
  }
}

export default App
