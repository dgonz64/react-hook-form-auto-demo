import React, { useRef } from 'react'
import {
  createSchema,
  addTranslations,
  translatable,
  Button,
  tr
} from 'react-hook-form-auto'
import { NotificationManager } from 'react-notifications'

import { Autoform } from './Autoform'
import styles from './inputs.sass'

addTranslations({
  models: {
    owner: {
      name: 'Owner\'s name',
      height: {
        _field: 'Height',
        tall: 'Tall',
        short: 'Short',
      },
      usesHat: 'Wears hat',
      pets: 'Owned pets',
      
    },
    pet: {
      name: 'Pet\'s name',
      heads: 'Number of heads',
      type: {
        _field: 'Kind',
        dog: 'Dog',
        cat: 'Cat'
      },
      hair: {
        _field: 'Hair color',
        _default: 'Select hair color...',
        blue: 'Blue',
        yellow: 'Yellow'
      }
    }
  },
  add: 'Add',
  notall: 'Only short people are allowed to have pets',
  submit: 'Submit'
})

export const DemoForm = ({ code, config, onSubmit }) => {
  const formRef = useRef()
  function handleImperativeSubmit() {
    formRef.current.submit()
  }

  function handleSubmit(doc) {
    NotificationManager.success(
      <pre>
        {JSON.stringify(doc, null, '\t')}
      </pre>
    , 'Form data', 10000)
  }

  let gibberish,
    schema

  try {
    gibberish = Function('createSchema', 'translatable', code)
    schema = gibberish(createSchema, translatable)

    return (
      <>
        <Autoform
          schema={schema}
          form="demo"
          destroyOnUnmount={false}
          config={config}
          ref={formRef}
          onSubmit={handleSubmit}
        />
        <Button
          text={tr('submit')}
          onClick={handleImperativeSubmit}
          styles={styles}
        />
      </>
    )
  } catch (err) {
    return <pre>{err.toString()}</pre>
  }
}
