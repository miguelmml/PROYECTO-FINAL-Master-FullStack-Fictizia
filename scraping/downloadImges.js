const download = require('image-downloader')
const fs = require('fs').promises
const path = require('path')

const downloadImage = (url, filename) => {
  const options = {
    url: url,
    dest: `./public/img/imagesDB/${filename}.jpg`,
    extractFilename: false
  }

  download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename)
    })
    .catch((err) => {
      console.error(`Error at downloadImage function -> ${err}`)
    })
}

const dropImagesDB = () => {
  fs.readdir('./public/img/imagesDB')
    .then(files => {
      if (files !== null) {
        files.map(file => {
          const filePath = path.join('./public/img/imagesDB', file)
          return fs.unlink(filePath)
        })
      }
    })
    .then(console.log('imagesDB dropped'))
}

module.exports = { downloadImage, dropImagesDB }
