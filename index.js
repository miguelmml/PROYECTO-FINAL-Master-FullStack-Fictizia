require('dotenv').config()
const app = require('./src/server')

const { connectionDB, disconnectDB } = require('./src/db/store')

const port = process.env.PORT

connectionDB()

process.on('SIGINT', function () {
  disconnectDB()
})

app.listen(port, (err) => {
  if (err) {
    console.error(`error to initializing server ${err}`)
  } else {
    console.log(`Server running in port ${port}`)
  }
})
