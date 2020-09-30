/* globals fetch */

import React from 'react'
import './App.css'
import CountryData from './components/CountryData'
import CountryList from './components/CountryList'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function About () {
  return <h2>About</h2>
}

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
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about/'>About</Link></li>
          </ul>
          <hr />
          <Switch>
            <Route path='/about/'>
              <About />
            </Route>
            <Route path='/country/:slug/' component={CountryData} />
            <Route path='/'>
              <CountryList countries={this.state.countries} />
            </Route>
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App
