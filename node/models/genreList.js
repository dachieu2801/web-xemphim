const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data', 'genreList.json')

const genreList = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));


module.exports = class GenreList {
  static genreId(name) {
    const genre = genreList.find(gen => gen.name === name)
    return genre.id
  }
}

