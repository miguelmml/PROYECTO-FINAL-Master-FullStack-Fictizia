const jwt = require('jsonwebtoken')
const User = require('../db/models/users')

const auth = async (req, res, next) => {
  const { token } = req.params
  try {
    const data = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.redirect('/login')
  }
}
module.exports = auth
