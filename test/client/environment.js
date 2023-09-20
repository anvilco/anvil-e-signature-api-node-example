const path = require('path')
const appModulePath = require('app-module-path')

const { configure } = require('enzyme')
const Adapter = require('@cfaester/enzyme-adapter-react-18').default

require('./dom')

configure({ adapter: new Adapter() })

appModulePath.addPath(path.join(__dirname, '..', '..', 'src', 'client'))
appModulePath.addPath(path.join(__dirname, '..', '..', 'src'))
