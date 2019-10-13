import React from 'react'
import { Panel as RHFAPanel } from 'react-hook-form-auto'

import styles from './Panel.sass'

export const Panel = props =>
  <RHFAPanel
    styles={styles}
    {...props}
  />
