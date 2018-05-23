import React from 'react'
import ReactDOM from 'react-dom'
import TransactionList from './TransactionList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TransactionList />, div)
})
