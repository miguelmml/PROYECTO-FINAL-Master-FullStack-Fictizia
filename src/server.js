const express = require('express')
const helmet = require('helmet')
var bodyParser = require('body-parser')

const { morganMiddleware } = require('./logs/logs.js')
const { getAllRanking, getComingSoon } = require('./db/store')
const User = require('./db/models/users')
const auth = require('./middlewares/auth')

const app = express()

// MIDDLEWARES
app.use(helmet())
// logger
app.use(morganMiddleware)
app.use('/static', express.static('public'))
// parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Render engine
app.set('view engine', 'pug')

/**  RUTAS  **/
app.get('/', (req, res) => {
  // response
  res.render('home')
})

app.get('/login', (req, res) => {
  // response
  res.render('login')
})

app.get('/signUp', (req, res) => {
  // response
  res.render('signup')
})

app.get('/rankings/:source/:token', auth, (req, res) => {
  // response
  const { source } = req.params
  getAllRanking(source)
    .then((data) => res.render('rankings', { data }))
})

app.get('/coming-soon/:token', auth, (req, res) => {
  // response
  getComingSoon()
    .then((data) => res.render('coming-soon', { data }))
})

app.get('/account/:token', auth, (req, res) => {
  // response
  res.render('account')
})

app.get('/search/:id/:token', auth, (req, res) => {
  // response
  res.render('search', { id: req.params.id })
})

// Create new user
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
  // Login a registered user
  try {
    const { email, password } = req.body
    console.log(email, password)
    const user = await User.findByCredentials(email, password)
    if (!user) {
      res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    console.log({ user, token })
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

// app.get('/users/me', auth, async (req, res) => {
//   // View logged in user profile
//   await connectionDB()
//   res.send(req.user)
// })

module.exports = app
