import React from 'react'
import ReactDOM from 'react-dom'
import CodeEditor from './CodeEditor'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CodeEditor />, div)
})
