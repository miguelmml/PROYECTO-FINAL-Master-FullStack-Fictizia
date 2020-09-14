const mongoose = require('mongoose')
const { models, capitalized } = require('./models/games')

const connectionDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'videogame-rankings',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
      .then(resolve(console.log('***successful database connection***')))
      .catch((err) => { reject(console.error(`error at conecctionDB function -> ${err}`)) })
  })
}

const dropDB = (collection) => {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.dropCollection(collection)
      .then(() => resolve(console.log(`drop --> ${collection}`)))
      .catch((err) => {
        reject(console.error(`error at dropDB function -> ${err}`))
      })
  })
}

const saveVideogame = (model, obj) => {
  return new Promise((resolve, reject) => {
    const capitalizedModel = capitalized(model)
    const videogame = new models[capitalizedModel]({
      title: obj.title,
      rankNumber: obj.rankNumber,
      img: obj.img,
      platform: obj.platform,
      date: obj.date,
      description: obj.description,
      score: obj.score
    })
    videogame.save()
      .then(() => resolve())
      .catch((err) => reject(console.error(`error at saveVideogame function -> ${err}`)))
  })
}

const getAllRanking = async (model) => {
  await connectionDB()
  const data = await models[capitalized(model)].find().sort({ rankNumber: 1 })
  return data
}

const getComingSoon = async () => {
  await connectionDB()
  const data = await models.Coming_soon.find().sort({ platform: 1 })
  return data
}

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('***MongoDb was disconnected***')
    process.exit(0)
  })
})

module.exports = { connectionDB, dropDB, saveVideogame, getAllRanking, getComingSoon }
