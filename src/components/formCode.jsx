export const formCode = ({
  arrayMode = false,
  schema
}) =>
`<Autoform
  schema={schema}
  config={{ arrayMode: '${arrayMode}' }}
/>`
