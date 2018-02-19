import React from 'react'
import { CountryMap } from '../components/Maps'


const CountryMapPage = props => {
  return (
    <CountryMap country={props.match.params.countryCode.toLowerCase()} />
  )
}

export default CountryMapPage
