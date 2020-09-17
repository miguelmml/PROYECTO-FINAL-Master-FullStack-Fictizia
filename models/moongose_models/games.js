const mongoose = require('mongoose')

const videogameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  rankNumber: Number,
  img: String,
  platform: {
    type: String,
    required: true,
    trim: true
  },
  date: String,
  description: { type: String, default: 'No description' },
  score: Number
})

const videogameModels = {
  Allall: mongoose.model('allall-rank', videogameSchema),
  Allyear: mongoose.model('allyear-rank', videogameSchema),
  Ps4all: mongoose.model('ps4all-rank', videogameSchema),
  Ps4year: mongoose.model('ps4year-rank', videogameSchema),
  Xboxoneall: mongoose.model('xboxoneall-rank', videogameSchema),
  Xboxoneyear: mongoose.model('xboxoneyear-rank', videogameSchema),
  Switchall: mongoose.model('switchall-rank', videogameSchema),
  Switchyear: mongoose.model('switchyear-rank', videogameSchema),
  Pcall: mongoose.model('pcall-rank', videogameSchema),
  Pcyear: mongoose.model('pcyear-rank', videogameSchema),
  Coming_soon: mongoose.model('coming_soon', videogameSchema)
}

module.exports = videogameModels
