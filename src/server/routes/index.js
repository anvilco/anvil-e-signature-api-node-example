const express = require('express')
const router = express.Router()
const os = require('os')
const db = require('../../db')

router.get('/api/username', async (req, res) => {
  return res.send({ username: os.userInfo().username })
})

router.get('/api/team-members', async (req, res) => {
  const teamMembers = db.teamMembers
  return res.send({ teamMembers })
})

module.exports = router
