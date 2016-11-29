const path = require('path');

const rootPath = path.normalize(path.join(__dirname, '/../..'));

module.exports = {
  root: rootPath,
  port: process.env.PORT || 5000,
  db: process.env.MONGOHQ_URL || 'mongodb://localhost:27017/cfh',
  secret: 'kissaSecret'
};
