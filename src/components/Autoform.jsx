import React, { forwardRef } from 'react'
import { Autoform as RHFAutoform } from 'react-hook-form-auto'

import panelStyles from './Panel.sass'
import inputStyles from './inputs.sass'

export let Autoform = (props, ref) =>
  <RHFAutoform
    styles={{ ...panelStyles, ...inputStyles }}
    {...props}
    ref={ref}
  />

Autoform = forwardRef(Autoform)
