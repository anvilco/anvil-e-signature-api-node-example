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
    },
    'react': {
      'version': 'detect',
    }
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    anvilBaseURL: "readonly",
    describe: "readonly",
    it: "readonly",
    beforeEach: "readonly",
  },
}
