const mongoose = require('mongoose')

const videogameSchema = new mongoose.Schema({
  title: String,
  rankNumber: Number,
  img: String,
  platform: String,
  date: String,
  description: String,
  score: Number
})

const models = {
  Allall: mongoose.model('allall-rank', videogameSchema),
  Allyear: mongoose.model('allyear-rank', videogameSchema),
  Ps4all: mongoose.model('ps4all-rank', videogameSchema),
  Ps4year: mongoose.model('ps4year-rank', videogameSchema),
  Xboxoneall: mongoose.model('xboxoneall-rank', videogameSchema),
  Xboxoneyear: mongoose.model('xboxoneyear-rank', videogameSchema),
  Switchall: mongoose.model('switchall-rank', videogameSchema),
  Switchyear: mongoose.model('switchyear-rank', videogameSchema),
  Pcall: mongoose.model('pcall-rank', videogameSchema),
  Pcyear: mongoose.model('pcyear-rank', videogameSchema)
}

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
  const capitalizedModel = model[0].toUpperCase() + model.slice(1)
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

module.exports = { connectionDB, disconnectDB, dropDB, saveVideogame }

// TODO:
// async function getAll (model) {
//   await connectionDB()
//   const data = await models[model].find()
//   console.log(data)
// }
// getAll('Ps4all')
