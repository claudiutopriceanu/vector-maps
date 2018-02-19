import React from 'react'
import PropTypes from 'prop-types'

import { geoMercator, geoPath } from 'd3-geo'


class CountryMap extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      data: null,
      countryNotFound: false
    }
    this.buildPath = this.buildPath.bind(this)
  }

  loadVector = (countryCode) => {
    this.setState({countryNotFound: false})
    import(`./geodata/10m/${countryCode}.json`)
      .then(data => this.setState({data: data}))
      .catch(error => this.setState({countryNotFound: true}))
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.country !== this.props.country) {
      const {country} = nextProps
      this.loadVector(country)
    }
  }

  componentWillMount () {
    const {country} = this.props
    this.loadVector(country)
  }

  buildPath () {
    if (this.state.data) {
      const { width, height } = this.props
      const projection = geoMercator()
      const pathGenerator = geoPath().projection(projection)

      projection
        .scale(1)
        .translate([0, 0])

      var b = pathGenerator.bounds(this.state.data)
      var s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height)
      var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

      projection
        .scale(s)
        .translate(t)

      return <path d={pathGenerator(this.state.data)} className='geo-path'/>
    }
    return null
  }

  render() {
    const { width, height } = this.props
    if (this.state.countryNotFound) {
      return <div>Country Not Found</div>
    } else {
      return (
        <div className="map-wrapper">
          <svg className="svg-content" preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${width} ${height}`}>
            { this.buildPath() }
          </svg>
        </div>
      )
    }
  }
}

CountryMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  country: PropTypes.string,
  onCountryNotFound: PropTypes.func
}

CountryMap.defaultProps = {
  width: 800,
  height: 500
}

export default CountryMap
