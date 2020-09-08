// data scraped from METACRITIC
const got = require('got')
const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { v4: uuidv4 } = require('uuid')

const times = ['all', 'year']
const platforms = ['all', 'ps4', 'xboxone', 'switch', 'pc']

async function gameScraper (platform, time) {
  const { body } = await got(`https://www.metacritic.com/browse/games/score/metascore/${time}/${platform}/filtered`)
  const dom = new JSDOM(body)
  const data = Array.from(dom.window.document.querySelectorAll('tr')).filter(i => i.classList.value !== 'spacer').map(i => {
    return {
      id: uuidv4(),
      title: i.querySelector('.clamp-summary-wrap > a > h3').textContent,
      rankNumber: i.querySelector('.clamp-summary-wrap > .numbered').textContent.trim(),
      img: i.querySelector('.clamp-image-wrap > a > img').src,
      platform: i.querySelector('.clamp-summary-wrap > .clamp-details > .platform > .data').textContent.trim(),
      date: i.querySelector('.clamp-summary-wrap > .clamp-details > span').textContent,
      description: i.querySelector('.clamp-summary-wrap > .summary').textContent.trim(),
      score: i.querySelector('.clamp-summary-wrap > .clamp-score-wrap > a > div').textContent
    }
  })

  console.log(data) // TODO: delete unnecessary console.log
  fs.writeFileSync(`dataJson/${time}_${platform}Ranking.json`, JSON.stringify(data, null, 2))
}

platforms.forEach(item => {
  try {
    gameScraper(item, times[0])
    gameScraper(item, times[1])
  } catch (err) {
    console.error(`Error in platforms.forEach() at item ${item}`)
  }
})
