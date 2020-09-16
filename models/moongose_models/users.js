const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  videogames: [{
    state: { type: String, default: 'Pending to play' },
    title: String,
    rankNumber: Number,
    img: String,
    platform: String,
    date: String,
    description: String,
    score: Number
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' })
  user.tokens = { token }
  await user.save()
  return token
}

userSchema.methods.saveVideogameInUser = async function (videogame) {
  const user = this
  user.videogames.push(videogame)
  await user.save(function (err) {
    if (err) console.error('Error in saveVideogamInUser', err)
  })
  return user.videogames
}

userSchema.methods.deleteVideogame = async function (title, platform) {
  const user = this
  let index = 0
  const videogamesArray = user.videogames
  videogamesArray.forEach(item => {
    if (item.title === title && item.platform === platform) {
      index = videogamesArray.indexOf(item)
    }
  })
  user.videogames.splice(index, 1)
  await user.save()
  return user.videogames
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

userSchema.statics.findByName = async (email) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({ error: 'User not found' })
  }
  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
