/* globals fetch */

import React from 'react'
import './App.css'
import CountryData from './components/CountryData'
import CountryList from './components/CountryList'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
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
    return (
      <Router>
        <div className='App'>
          <h1>COVID Explorer</h1>
          <div className='container'>
            <CountryList countries={this.state.countries} />
            <Switch>
              <Route path='/country/:slug/'>
                <CountryData />
              </Route>
              <Route path='/'>
                <div>Pick a country to see its data.</div>
              </Route>
            </Switch>
          </div>

        </div>
      </Router>
    )
  }
}

export default App
