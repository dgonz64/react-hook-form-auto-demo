export const CHANGE = 'CHANGE'
export const FIX = 'FIX'
export const CHANGE_CONFIG = 'CHANGE_CONFIG'

export const change = (code) => ({
  type: CHANGE,
  code
})

export const fix = (config) => ({
  type: FIX,
  config
})

const initialCode =
`const pet = createSchema('pet', {
  name: {
    type: String,
    required: true,
    maxLength: 8
  },
  heads: {
    type: Number
  },
  hair: {
    type: 'select',
    options: ['blue', 'yellow']
  },
});

return createSchema('owner', {
  name: {
    type: 'string',
    required: true,
  },
  height: {
    type: 'radios',
    options: ['tall', 'short']
  },
  usesHat: {
    type: 'boolean'
  },
  pets: {
    type: [pet],
    minChildren: 1
  }
});`

export const initial = {
  code: initialCode,
  edit: initialCode,
  config: {
    arrayMode: 'panel'
  }
}

export const reducer = (state = initial, action) => {
  switch (action.type) {
  case CHANGE:
    return Object.assign(
      {},
      state,
      { edit: action.code }
    )
  case FIX:
    return Object.assign(
      {},
      state,
      {
        code: state.edit,
        config: action.config
      }
    )
  default:
    return state
  }
}

export const mapActions = dispatch => {
  return {
    changeCode: code => {
      dispatch(change(code))
    },
    fix: (config) => {
      dispatch(fix(config))
    }
  }
}
