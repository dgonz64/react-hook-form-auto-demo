import React, { useEffect, useRef, useReducer } from 'react'
import AceEditor from 'react-ace'
import { NotificationContainer } from 'react-notifications'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-noconflict/theme-github'

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
  }

  const handleSubmit = (config) => {
    actions.fix(config)
  }

  return (
    <div className={styles.appWrap}>
      <h3 className={styles.demoTitle}>
        <a href="https://github.com/dgonz64/react-hook-form-auto">
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
            <Panel header="Form parameters">
              <DemoConfig
                onSubmit={handleSubmit}
                config={config}
              >
                <div className={styles.renderButton}>
                  <Button type="submit">
                    Update
                  </Button>
                </div>
              </DemoConfig>
            </Panel>
          </Panel>
        </div>
        <div className={styles.results}>
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
