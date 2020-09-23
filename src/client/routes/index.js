import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MainPage from './MainPage'
import OneSignerEmbedded from './OneSignerEmbedded'
import TwoSignersEmbedded from './TwoSignersEmbedded'
import FinishedPage from './FinishedPage'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/finish" component={FinishedPage} />
        <Route path="/oneSignerEmbedded" component={OneSignerEmbedded} />
        <Route path="/twoSignersEmbedded" component={TwoSignersEmbedded} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  )
}

export default Routes
