/* globals fetch */

import React from 'react'
import './App.css'

class App extends React.Component {
  constructor () {
    super()
    console.log('constructor')
    this.state = {
      selectedCountry: null,
      countries: []
    }
  }

  componentDidMount () {
    console.log('componentDidMount')
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
    console.log('render')

    let body
    if (this.state.selectedCountry !== null) {
      body = (
        <div>
          <h2>{this.state.selectedCountry.Country}</h2>
          <p>
            <button onClick={() => this.setState({ selectedCountry: null })}>
            Back to country list
            </button>
          </p>
        </div>
      )
    } else {
      body = (
        <ul>
          {this.state.countries.map(country => (
            <li key={country.ISO2}>
              <button onClick={() => this.setState({
                selectedCountry: country
              })}
              >
                {country.Country}
              </button>
            </li>
          ))}
        </ul>
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
