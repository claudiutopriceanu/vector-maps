import React from 'react'
import PropTypes from 'prop-types'

import { geoMercator, geoPath } from 'd3-geo'

import data from './geodata/world_110m.json'


class WorldMap extends React.Component {

  constructor (props) {
    super(props)
    this.buildPaths = this.buildPaths.bind(this)
  }

  buildPaths () {
    const { width, height } = this.props
    const projection = geoMercator()
    const path = geoPath().projection(projection)
    const scale = (width - 3) / (2 * Math.PI)
    const translation = [width / 2, height / 2]
    projection
      .scale(scale)
      .translate(translation)
    return data.features.map((d,i) => {
         return <path
            key={'path' + i}
            d={path(d)}
            className='geo-path'
        />
     })
  }

  render() {
    const { width, height } = this.props
    return (
      <div className="map-wrapper">
        <svg width={width} height={height}>
          { this.buildPaths() }
        </svg>
      </div>
    )
  }
}

WorldMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

WorldMap.defaultProps = {
  width: 800,
  height: 500
}

export default WorldMap
