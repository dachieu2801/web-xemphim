const users = require('../models/userToken')

module.exports = (req, res, next) => {
  const userToken = req.params.userToken || req.body.userToken
  const user = users.find(user => user.token === userToken)
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
  } else {
    console.log(user.userId);
    next()
  }
}