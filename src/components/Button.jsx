import React from 'react'

import styles from './Button.sass'

export const Button = ({
  children,
  onClick
}) => {
  const defaulted = e => {
    e.preventDefault()
    onClick()
  }

  return (
    <a href="#" onClick={defaulted} className={styles.button}>
      {children}
    </a>
  )
}
