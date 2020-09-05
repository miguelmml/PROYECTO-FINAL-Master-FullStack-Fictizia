const express = require('express')
const helmet = require('helmet')

const { morganMiddleware } = require('./logs/logs.js')

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

app.get('/rankings', (req, res) => {
  // response
  res.render('rankings')
})

app.get('/types', (req, res) => {
  // response
  res.render('types')
})

app.get('/platforms', (req, res) => {
  // response
  res.render('platforms')
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
