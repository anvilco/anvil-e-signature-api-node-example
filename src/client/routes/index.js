import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MainPage from './MainPage'
import EmailPacketPage from './EmailPacketPage'
import EmbeddedPacketPage from './EmbeddedPacketPage'
import PacketDetailsPage from './PacketDetailsPage'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/emailPacket/create" component={EmailPacketPage} />
        <Route path="/embeddedPacket/create" component={EmbeddedPacketPage} />
        <Route path="/packet/:packetEid" component={PacketDetailsPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  )
}

Routes.propTypes = {}

export default Routes
