// data scraped from METACRITIC
const got = require('got')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const db = require('../models/store')
const { downloadImage } = require('./downloadImges')

async function gameRankingScraper (platform, time) {
  const { body } = await got(`https://www.metacritic.com/browse/games/score/metascore/${time}/${platform}/filtered`)
  const dom = new JSDOM(body)

  await db.dropCollection(`${platform + time}-ranks`)

  Array.from(dom.window.document.querySelectorAll('tr')).filter(i => i.classList.value !== 'spacer').map(async i => {
    const imageSrc = i.querySelector('.clamp-image-wrap > a > img').src
    const title = i.querySelector('.clamp-summary-wrap > a > h3').textContent.split(' ').join('_')
    const platformName = i.querySelector('.clamp-summary-wrap > .clamp-details > .platform > .data').textContent.trim().split(' ').join('_')
    const imageName = title.concat(platformName)
    const imageNameConverted = await convertStringToNumber(imageName)
    setTimeout(function () { downloadImage(imageSrc, imageNameConverted) }, 1000)

    const videogame = {
      title: i.querySelector('.clamp-summary-wrap > a > h3').textContent,
      rankNumber: i.querySelector('.clamp-summary-wrap > .numbered').textContent.trim().slice('length', -1),
      platform: i.querySelector('.clamp-summary-wrap > .clamp-details > .platform > .data').textContent,
      date: i.querySelector('.clamp-summary-wrap > .clamp-details > span').textContent,
      description: i.querySelector('.clamp-summary-wrap > .summary').textContent.trim(),
      score: i.querySelector('.clamp-summary-wrap > .clamp-score-wrap > a > div').textContent,
      img: `/static/img/imagesDB/${imageNameConverted}.jpg`
    }

    await db.saveVideogame(`${platform + time}`, videogame)
  })

  console.log(`${platform + time}-ranks refilled`)
}

async function comingSoonScraper () {
  const { body } = await got('https://www.metacritic.com/browse/games/release-date/coming-soon/all/date')
  const dom = new JSDOM(body)

  await db.dropCollection('coming_soons')

  Array.from(dom.window.document.querySelectorAll('tr')).filter(i => i.classList.value !== 'spacer').map(async i => {
    const imageSrc = i.querySelector('.clamp-image-wrap > a > img').src
    const title = i.querySelector('.clamp-summary-wrap > a > h3').textContent.split(' ').join('_')
    const platformName = i.querySelector('.clamp-summary-wrap > .clamp-details > .platform > .data').textContent.trim().split(' ').join('_')
    const imageName = title.concat(platformName)
    const imageNameConverted = await convertStringToNumber(imageName)
    setTimeout(function () { downloadImage(imageSrc, imageNameConverted) }, 1000)

    const videogame = {
      title: i.querySelector('.clamp-summary-wrap > a > h3').textContent,
      platform: i.querySelector('.clamp-summary-wrap > .clamp-details > .platform > .data').textContent.trim(),
      date: i.querySelector('.clamp-summary-wrap > .clamp-details > span').textContent,
      description: i.querySelector('.clamp-summary-wrap > .summary').textContent.trim(),
      img: `/static/img/imagesDB/${imageNameConverted}.jpg`
    }

    db.saveVideogame('coming_soon', videogame)
  })
  console.log('coming_soon collection refilled')
}

async function convertStringToNumber (text) {
  text = text.slice(-20)
  let textConverted = ''
  const textArray = text.split('')
  textArray.forEach(element => {
    if (element !== '_') {
      const elementCode = element.charCodeAt()
      textConverted += elementCode
    }
  })
  return textConverted
}

module.exports = { gameRankingScraper, comingSoonScraper }
