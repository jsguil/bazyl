import React from 'react'
import ReactDOM from 'react-dom'
import General from './General'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<General />, div)
})
