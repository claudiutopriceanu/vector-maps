import React from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { withRouter } from 'react-router-dom'

import options from './options.json'


class CountrySelect extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      selectedOption: null
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
    if (selectedOption) {
      this.props.history.push(`${process.env.PUBLIC_URL}/${selectedOption.value.toLowerCase()}`)
    } else {
      this.props.history.push(`${process.env.PUBLIC_URL}/`)
    }
  }

  render() {
    const { selectedOption } = this.state
    const value = (
      selectedOption ?
      selectedOption.value :
      this.props.location.pathname.replace(process.env.PUBLIC_URL, '').replace('/', '').toUpperCase()
    )

    return (
      <Select
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default withRouter(CountrySelect)
