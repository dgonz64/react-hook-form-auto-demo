import React from 'react'

import {
  createSchema,
  addTranslations,
  setLanguageByName
} from 'react-hook-form-auto'

import { Autoform } from './Autoform'

addTranslations({
  models: {
    config: {
      arrayMode: {
        _: 'Array mode',
        table: 'Table',
        panel: 'Panels'
      }
    }
  }
})

const configSchema = createSchema('config', {
  arrayMode: {
    type: 'radios',
    options: ['table', 'panel']
  }
})

export const DemoConfig = ({
  onChange,
  config
}) =>
  <Autoform
    schema={configSchema}
    onChange={onChange}
    config={config}
  />
