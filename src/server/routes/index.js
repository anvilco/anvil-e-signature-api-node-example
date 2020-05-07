const os = require('os')
const db = require('db')

// LowDB Usage
// https://github.com/typicode/lowdb#how-to-use-id-based-resources

function buildRoutes (router) {
  router.get('/api/username', async (req, res) => {
    return res.send({ username: os.userInfo().username })
  })

  router.get('/api/files', async (req, res) => {
    const files = db.get('files').value()
    return res.send(files)
  })

  router.post('/api/files', async (req, res) => {
    const { description, file } = req.body
    const newFile = db.get('files')
      .insert({
        description,
        filename: file.name,
        mimetype: file.mimetype,
        src: file.base64,
      })
      .write()
    return res.send(newFile)
  })

  return router
}

module.exports = buildRoutes
