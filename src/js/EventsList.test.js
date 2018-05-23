import React from 'react'
import ReactDOM from 'react-dom'
import EventsList from './EventsList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EventsList />, div)
})
