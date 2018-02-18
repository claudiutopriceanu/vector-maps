import React from 'react'
import { CountryMap } from '../components/Maps'


const CountryMapPage = props => {
  return (
    <div>
      <CountryMap country={props.match.params.countryCode.toLowerCase()} />
    </div>
  )
}


export default CountryMapPage
