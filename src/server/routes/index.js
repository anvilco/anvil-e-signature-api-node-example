const express = require('express')
const os = require('os')
const db = require('db')
const router = express.Router()

// LowDB Usage
// https://github.com/typicode/lowdb#how-to-use-id-based-resources

router.get('/api/username', async (req, res) => {
  return res.send({ username: os.userInfo().username })
})

router.get('/api/files', async (req, res) => {
  const files = db.get('files').value()
  return res.send(files)
})

module.exports = router
