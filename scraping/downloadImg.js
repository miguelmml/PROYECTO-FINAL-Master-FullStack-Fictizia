const download = require('image-downloader')
const fs = require('fs').promises
const path = require('path')

const downloadImage = (url, filename) => {
  const options = {
    url: url,
    dest: `../public/img/${filename}.jpg`,
    extractFilename: false
  }

  download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename)
    })
    .catch((err) => console.error(err))
}

const dropImagesDB = () => {
  fs.readdir('../public/img')
    .then(files => {
      if (files !== null) {
        files.map(file => {
          const filePath = path.join('../public/img', file)
          return fs.unlink(filePath)
        })
      }
    })
}

module.exports = { downloadImage, dropImagesDB }
