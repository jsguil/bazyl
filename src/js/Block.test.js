import React from 'react'
import ReactDOM from 'react-dom'
import Block from './Block'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Block />, div)
})
