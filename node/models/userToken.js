const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data', 'userToken.json')

module.exports = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));




