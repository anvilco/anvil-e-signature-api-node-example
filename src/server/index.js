const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.static('dist'))
app.use(routes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀!`))
