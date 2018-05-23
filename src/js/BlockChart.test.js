import React from 'react'
import ReactDOM from 'react-dom'
import BlockChart from './BlockChart'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BlockChart />, div)
})
