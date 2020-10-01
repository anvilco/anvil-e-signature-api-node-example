import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MainPage from './MainPage'
import EmailPacket from './EmailPacket'
import EmbeddedPacket from './EmbeddedPacket'
import FinishedPage from './FinishedPage'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/emailPacket/create" component={EmailPacket} />
        <Route path="/embeddedPacket/create" component={EmbeddedPacket} />
        <Route path="/finish" component={FinishedPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  )
}

export default Routes
