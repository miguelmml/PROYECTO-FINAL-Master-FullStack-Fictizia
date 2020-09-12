const mongoose = require('mongoose')
const { models, capitalized } = require('./models')

const connectionDB = async () => {
  await mongoose.connect('mongodb://localhost:27017', {
    dbName: 'videogame-rankings',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(console.log('***successful database connection***'))
    .catch((err) => {
      console.error(`error at conecctionDB function -> ${err}`)
    })
}

const disconnectDB = async () => {
  await mongoose.disconnect()
    .then(console.log('***database was disconnected***'))
    .catch((err) => {
      console.error(`error at disconnectedDB function -> ${err}`)
    })
}

const dropDB = async (collection) => {
  await mongoose.connection.db.dropCollection(collection)
    .then(console.log(`drop de ${collection}`))
    .catch((err) => {
      console.error(`error at dropDB function -> ${err}`)
    })
}

const saveVideogame = async (model, obj) => {
  const capitalizedModel = capitalized(model)
  try {
    const videogame = new models[capitalizedModel]({
      title: obj.title,
      rankNumber: obj.rankNumber,
      img: obj.img,
      platform: obj.platform,
      date: obj.date,
      description: obj.description,
      score: obj.score
    })

    await videogame.save()
  } catch (err) {
    console.error(`error at saveVideogame function -> ${err}`)
  }
}

const getAllRanking = async (model) => {
  await connectionDB()
  const data = await models[capitalized(model)].find().sort({ rankNumber: 1 })
  console.log(data)
  disconnectDB()
  return data
}

const getComingSoon = async () => {
  await connectionDB()
  const data = await models.Coming_soon.find().sort({ platform: 1 })
  console.log(data)
  disconnectDB()
  return data
}


module.exports = { connectionDB, disconnectDB, dropDB, saveVideogame, getAllRanking, getComingSoon }
