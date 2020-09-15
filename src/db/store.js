require('dotenv').config()
const mongoose = require('mongoose')
const videogameModels = require('./models/games')
const User = require('./models/users')

const connectionDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
      .then(resolve(console.log('- Successful database connection -')))
      .catch((err) => { reject(console.error(`error at conecctionDB function -> ${err}`)) })
  })
}

const disconnectDB = () => {
  try {
    mongoose.connection.close(function () {
      console.log('- Database was disconnected -')
      process.exit(0)
    })
  } catch (error) {
    console.error('Failed to disconnect database!')
  }
}

const dropCollection = (collection) => {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.dropCollection(collection)
      .then(resolve(console.log(`drop --> ${collection}`)))
      .catch((err) => {
        reject(console.error(`error at dropDB function -> ${err}`))
      })
  })
}

const saveVideogame = (model, obj) => {
  return new Promise((resolve, reject) => {
    const capitalizedModel = capitalized(model)
    const videogame = new videogameModels[capitalizedModel]({
      title: obj.title,
      rankNumber: obj.rankNumber,
      img: obj.img,
      platform: obj.platform,
      date: obj.date,
      description: obj.description,
      score: obj.score
    })
    videogame.save()
      .then(resolve())
      .catch((err) => reject(console.error(`error at saveVideogame function -> ${err}`)))
  })
}

const getAllRanking = async (model) => {
  const data = await videogameModels[capitalized(model)].find().sort({ rankNumber: 1 })
  return data
}

const getComingSoon = async () => {
  const data = await videogameModels.Coming_soon.find().sort({ platform: 1 })
  return data
}

const getMyList = async (email) => {
  const user = await User.findByName(email)
  if (!user) {
    throw new Error('Error at getMyList in store.js -> User not found')
  }
  const data = user.videogames
  return data
}

const capitalized = (text) => {
  return text[0].toUpperCase() + text.slice(1)
}

module.exports = { connectionDB, disconnectDB, dropCollection, saveVideogame, getAllRanking, getComingSoon, getMyList }
