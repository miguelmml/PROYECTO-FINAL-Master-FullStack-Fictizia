const express = require('express')
const helmet = require('helmet')
var bodyParser = require('body-parser')

const { morganMiddleware } = require('./middlewares/logs.js')
const { getAllRanking, getComingSoon, getMyList } = require('./db/store')
const User = require('./db/models/users')
const auth = require('./middlewares/auth')

const app = express()

// MIDDLEWARES
app.use(helmet())
app.use(morganMiddleware)
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// RENDER ENGINE
app.set('view engine', 'pug')

// ROUTES : GET
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signUp', (req, res) => {
  res.render('signup')
})

app.get('/rankings/:source/:token', auth, (req, res) => {
  const { source } = req.params
  getAllRanking(source)
    .then((data) => res.render('rankings', { data }))
})

app.get('/coming-soon/:token', auth, (req, res) => {
  getComingSoon()
    .then((data) => res.render('coming-soon', { data }))
})

app.get('/account/:user/:token', auth, async (req, res) => {
  const { user } = req.params
  getMyList(user)
    .then((data) => res.render('account', { data }))
})

// ROUTES : POST
app.post('/users/signUp', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.post('/users/saveGame', async (req, res) => {
  try {
    const { email, videogame } = req.body
    const user = await User.findByName(email)
    if (!user) {
      res.status(401).send({ error: 'User not found' })
    }
    await user.saveVideogame(videogame)
    res.send()
  } catch (err) {
    res.status(400).send(err)
  }
})

app.post('/users/deleteGame', async (req, res) => {
  try {
    const { email, videogameName, videogamePlatform } = req.body
    const user = await User.findByName(email)
    if (!user) {
      res.status(401).send({ error: 'User not found' })
    }
    await user.deleteVideogame(videogameName, videogamePlatform)
    res.send()
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = app
