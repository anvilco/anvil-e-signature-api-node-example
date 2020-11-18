module.exports = {
  extends: ['nicenice'],
  settings: {
    'import/resolver': {
      'node': {
        'moduleDirectory': [
          'node_modules',
          'src',
          '.'
        ]
      }
    }
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    anvilBaseURL: "readonly",
  },
}
