const { dropImagesDB } = require('./downloadImges')
const { gameRankingScraper, comingSoonScraper } = require('./scrapers')
const db = require('../src/db/store');

(async function initScraper () {
  const times = ['all', 'year']
  const platforms = ['all', 'ps4', 'xboxone', 'switch', 'pc']

  await db.connectionDB()

  dropImagesDB()

  await comingSoonScraper()

  platforms.forEach(async (item) => {
    await gameRankingScraper(item, times[0])
    await gameRankingScraper(item, times[1])
  })
})()
