import React from 'react'
import { Panel as RHFAPanel } from 'react-hook-form-auto'

import styles from 'rhfa-emergency-styles/unprefixed.sass'

export const Panel = props =>
  <RHFAPanel
    styles={styles}
    {...props}
  />
