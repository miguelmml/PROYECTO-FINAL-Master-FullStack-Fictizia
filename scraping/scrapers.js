// data scraped from METACRITIC
const got = require('got')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { v4: uuidv4 } = require('uuid')

const db = require('../src/db/store')
const { downloadImage } = require('./downloadImges')

async function gameRankingScraper (platform, time) {
  const { body } = await got(`https://www.metacritic.com/browse/games/score/metascore/${time}/${platform}/filtered`)
  const dom = new JSDOM(body)

  await db.dropCollection(`${platform + time}-ranks`)

  Array.from(dom.window.document.querySelectorAll('tr')).filter(i => i.classList.value !== 'spacer').map(async i => {
    const imageName = uuidv4()
    const imageSrc = i.querySelector('.clamp-image-wrap > a > img').src

    const videogame = {
      title: i.querySelector('.clamp-summary-wrap > a > h3').textContent,
      rankNumber: i.querySelector('.clamp-summary-wrap > .numbered').textContent.trim().slice('length', -1),
      platform: i.querySelector('.clamp-summary-wrap > .clamp-details > .platform > .data').textContent.trim(),
      date: i.querySelector('.clamp-summary-wrap > .clamp-details > span').textContent,
      description: i.querySelector('.clamp-summary-wrap > .summary').textContent.trim(),
      score: i.querySelector('.clamp-summary-wrap > .clamp-score-wrap > a > div').textContent,
      img: `/static/img/${imageName}.jpg`
    }

    await db.saveVideogame(`${platform + time}`, videogame)
    setTimeout(function () { downloadImage(imageSrc, imageName) }, 1000)
  })

  console.log(`${platform + time}-ranks refilled`)
}

async function comingSoonScraper () {
  const { body } = await got('https://www.metacritic.com/browse/games/release-date/coming-soon/all/date')
  const dom = new JSDOM(body)

  await db.dropDB('coming_soons')

  Array.from(dom.window.document.querySelectorAll('tr')).filter(i => i.classList.value !== 'spacer').map(i => {
    const imageName = uuidv4()
    const imageSrc = i.querySelector('.clamp-image-wrap > a > img').src

    const videogame = {
      title: i.querySelector('.clamp-summary-wrap > a > h3').textContent,
      platform: i.querySelector('.clamp-summary-wrap > .clamp-details > .platform > .data').textContent.trim(),
      date: i.querySelector('.clamp-summary-wrap > .clamp-details > span').textContent,
      description: i.querySelector('.clamp-summary-wrap > .summary').textContent.trim(),
      img: `/static/img/${imageName}.jpg`
    }

    db.saveVideogame('coming_soon', videogame)
    setTimeout(function () { downloadImage(imageSrc, imageName) }, 1000)
  })
  console.log('coming_soon collection refilled')
}

module.exports = { gameRankingScraper, comingSoonScraper }
