import React from 'react'

import styles from './Button.sass'

export const Button = ({
  children,
  onClick
}) => {
  const defaulted = onClick ? e => {
    e.preventDefault()
    onClick()
  } : null

  return (
    <button href="#" onClick={defaulted} className={styles.button}>
      {children}
    </button>
  )
}
