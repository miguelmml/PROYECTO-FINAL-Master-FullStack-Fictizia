require('dotenv').config()
const app = require('./src/server')

const port = process.env.PORT

app.listen(port, (err) => {
  if (err) {
    console.error(`error to initializing server ${err}`)
  } else {
    console.log(`Server running in port ${port}`)
  }
})
