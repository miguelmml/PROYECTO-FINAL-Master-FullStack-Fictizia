// data scraped from METACRITIC
const got = require('got')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { v4: uuidv4 } = require('uuid')

const db = require('../src/db/store')
const { downloadImage, dropImagesDB } = require('./downloadImg')

const times = ['all', 'year']
const platforms = ['all', 'ps4', 'xboxone', 'switch', 'pc']

async function gameScraper (platform, time) {
  await db.dropDB(`${platform + time}-ranks`)
  dropImagesDB()

  const { body } = await got(`https://www.metacritic.com/browse/games/score/metascore/${time}/${platform}/filtered`)
  const dom = new JSDOM(body)

  Array.from(dom.window.document.querySelectorAll('tr')).filter(i => i.classList.value !== 'spacer').map(i => {
    const imageName = uuidv4()
    const url = i.querySelector('.clamp-image-wrap > a > img').src

    const videogame = {
      title: i.querySelector('.clamp-summary-wrap > a > h3').textContent,
      rankNumber: i.querySelector('.clamp-summary-wrap > .numbered').textContent.trim().slice('length', -1),
      platform: i.querySelector('.clamp-summary-wrap > .clamp-details > .platform > .data').textContent.trim(),
      date: i.querySelector('.clamp-summary-wrap > .clamp-details > span').textContent,
      description: i.querySelector('.clamp-summary-wrap > .summary').textContent.trim(),
      score: i.querySelector('.clamp-summary-wrap > .clamp-score-wrap > a > div').textContent,
      img: `../static/img/${imageName}.jpg`
    }

    setTimeout(function () { downloadImage(url, imageName) }, 1000)
    db.saveVideogame(`${platform + time}`, videogame)
  })
  console.log(`${platform + time}-ranks refilled`)
}

(async function initScraper () {
  await db.connectionDB()
  platforms.forEach((item) => {
    gameScraper(item, times[0])
    gameScraper(item, times[1])
  })
  // TODO:disconnect ddbb after scraping
})()
