import React from 'react'
import { render } from 'react-dom'

import { App } from './components/App.jsx'
import { setLanguageByName } from 'react-hook-form-auto'

setLanguageByName('en')

render(
  <App />,
  document.getElementById('root')
)
