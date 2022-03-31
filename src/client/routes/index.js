import React from 'react'
import { BrowserRouter as Router, Routes as ReactRoutes, Route } from 'react-router-dom'

import MainPage from './MainPage'
import EmailPacketPage from './EmailPacketPage'
import EmbeddedPacketPage from './EmbeddedPacketPage'
import PacketDetailsPage from './PacketDetailsPage'

const Routes = () => {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/emailPacket/create" element={<EmailPacketPage />} />
        <Route path="/embeddedPacket/create" element={<EmbeddedPacketPage />} />
        <Route path="/packet/:packetEid" element={<PacketDetailsPage />} />
        <Route path="/" element={<MainPage />} />
      </ReactRoutes>
    </Router>
  )
}

Routes.propTypes = {}

export default Routes
