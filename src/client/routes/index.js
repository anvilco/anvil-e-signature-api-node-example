import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MainPage from './MainPage'
import EmailPacket from './EmailPacket'
import EmbeddedPacket from './EmbeddedPacket'
import EmbeddedPacketDetails from './EmbeddedPacketDetails'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/emailPacket/create" component={EmailPacket} />
        <Route path="/embeddedPacket/create" component={EmbeddedPacket} />
        <Route path="/embeddedPacket/:packetEid" component={EmbeddedPacketDetails} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  )
}

export default Routes
