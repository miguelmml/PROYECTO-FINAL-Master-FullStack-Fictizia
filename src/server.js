const express = require('express')
const helmet = require('helmet')

const { morganMiddleware } = require('./logs/logs.js')
const { getAllRanking } = require('./db/store')

const app = express()

// MIDDLEWARES
app.use(helmet())
// logger
app.use(morganMiddleware)
app.use('/static', express.static('public'))

// Render engine
app.set('view engine', 'pug')

/**  RUTAS  **/
app.get('/', (req, res) => {
  // response
  res.render('home')
})

app.get('/rankings/:source', (req, res) => {
  // response
  const { source } = req.params
  getAllRanking(source)
    .then((data) => res.render('rankings', { data }))
})

app.get('/coming-soon', (req, res) => {
  // response
  res.render('coming-soon')
})

app.get('/account', (req, res) => {
  // response
  res.render('account')
})

app.get('/search/:id', (req, res) => {
  // response
  res.render('search', { id: req.params.id })
})

module.exports = app
