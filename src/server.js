const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const helmet = require('helmet')

const app = express()

// MIDDLEWARES
app.use(helmet())
// logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
app.use(morgan('common', { stream: accessLogStream }))

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
