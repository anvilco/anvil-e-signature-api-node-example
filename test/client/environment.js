const path = require('path')
const appModulePath = require('app-module-path')

const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

require('./dom')

configure({ adapter: new Adapter() })

appModulePath.addPath(path.join(__dirname, '..', '..', 'src', 'client'))
appModulePath.addPath(path.join(__dirname, '..', '..', 'src'))
