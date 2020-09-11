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

const capitalized = (text) => {
  return text[0].toUpperCase() + text.slice(1)
}
module.exports = { models, capitalized }
