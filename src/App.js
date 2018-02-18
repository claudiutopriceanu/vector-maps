import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import CountrySelect from './components/CountrySelect'
import WorldMapPage from './pages/WorldMapPage'
import CountryMapPage from './pages/CountryMapPage'

import './App.css'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="navbar">
            <div className="country-selector-wrapper">
              <CountrySelect />
            </div>
          </div>

          <Route path={`${process.env.PUBLIC_URL}/`} exact component={WorldMapPage} />
          <Route path={`${process.env.PUBLIC_URL}/:countryCode`} component={CountryMapPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
