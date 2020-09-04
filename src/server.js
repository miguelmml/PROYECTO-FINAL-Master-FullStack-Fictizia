const express = require('express')
const helmet = require('helmet')

const { morganMiddleware } = require('./logs/logs.js')

const app = express()

// MIDDLEWARES
app.use(helmet())
// logger
app.use(morganMiddleware)
app.use(express.static('public'))

// RUTAS
app.get('/', (req, res) => {
  // response
  res.send('home')
})
app.get('/rankings', (req, res) => {
  // response
  res.send('rankings')
})
app.get('/types', (req, res) => {
  // response
  res.send('types')
})
app.get('/platforms', (req, res) => {
  // response
  res.send('platforms')
})
app.get('/myList_and_friends', (req, res) => {
  // response
  res.send('my list and friends')
})
app.get('/search/:id', (req, res) => {
  // response
  res.send(`search ==> ${req.params.id}`)
})

module.exports = app
