require('dotenv').config()
const app = require('./controllers/app')
const { connectionDB, disconnectDB } = require('./models/store')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, host, (err) => {
  if (err) {
    console.error(`Error to initializing server ${err}`)
  } else {
    console.log(`Server running in port ${port}`)
    connectionDB()
      .then((data) => console.log(data.msg))
      .catch((error) => console.error(`Error to connect database ${error}`))
  }
})

process.on('SIGINT', function () {
  disconnectDB()
})
