import React from 'react'
import ReactDOM from 'react-dom'
import BalancesList from './BalancesList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BalancesList />, div)
})
