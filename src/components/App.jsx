import React, { useEffect, useRef, useReducer } from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import { NotificationContainer } from 'react-notifications'

import 'brace/mode/javascript'
import 'brace/mode/jsx'
import 'brace/theme/github'

import { editing } from '../ducks'

import { DemoForm } from './DemoForm'
import { DemoConfig } from './DemoConfig'
import { formCode } from './formCode'
import { Panel } from './Panel'
import { Button } from './Button'

import styles from './App.sass'
import 'react-notifications/lib/notifications.css'
import '../globals.css'

const handleChange = (changeCode, code) => {
  changeCode(code)
}

const handleConfigChange = (curConfig, changeConfig, config) => {
  if (config && curConfig.arrayMode != config.arrayMode) {
    changeConfig(config)
  }
}

export const App = () => {
  const sampleEl = useRef(null)

  const [ { code, edit, config }, dispatch ] = useReducer(
    editing.reducer,
    editing.initial
  )
  const actions = editing.mapActions(dispatch)

  useEffect(() => {
    const { editor } = sampleEl.current

    editor.setOptions({
      readOnly: true,
      highlightActiveLine: false,
      highlightGutterLine: false
    })

    editor.renderer.$cursorLayer.element.style.display = 'none'
  })

  const updateRender = () => {
    actions.fix()
  }

  return (
    <div className={styles.appWrap}>
      <h3 className={styles.demoTitle}>
        <a href="https://github.com/dgonz64/redux-form-auto">
          react-hook-form-auto demo
        </a>
      </h3>
      <div className={styles.appContent}>
        <div className={styles.code}>
          <Panel
            header="Schema (edit and see the results in real time)"
            noMargin
          >
            <AceEditor
              mode="javascript"
              theme="github"
              onChange={handleChange.bind(null, actions.changeCode)}
              value={edit}
              width="100%"
              name="editor"
            />
            <p><small>
              Editor thanks to{' '}
              <a href="https://github.com/securingsincity/react-ace">
                React-Ace
              </a>
            </small></p>
            <div className={styles.renderButton}>
              <Button onClick={updateRender}>
                Update
              </Button>
            </div>
          </Panel>
        </div>
        <div className={styles.results}>
          <Panel header="Form parameters">
            <DemoConfig
              onChange={handleConfigChange.bind(null, config, actions.changeConfig)}
            />
          </Panel>
          <Panel header="Form element" noMargin>
            <AceEditor
              mode="jsx"
              theme="github"
              value={formCode(config)}
              name="sample"
              maxLines={5}
              readOnly
              ref={sampleEl} 
            />
          </Panel>
          <Panel header="Generated form" borderType="primary">
            <DemoForm code={code} config={config} />
          </Panel>
        </div>
      </div>
      <NotificationContainer />
    </div>
  )
}
