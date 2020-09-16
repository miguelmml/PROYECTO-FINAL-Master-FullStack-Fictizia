require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../../models/moongose_models/users')

const auth = async (req, res, next) => {
  try {
    const { token } = req.params
    if (token === 'null') {
      throw new Error('Error at auth middleware in auth.js / Token not found')
    } else {
      const data = jwt.verify(token, process.env.JWT_KEY)
      const user = await User.findOne({ _id: data._id, 'tokens.token': token })
      if (!user) {
        throw new Error('Error at auth middleware in auth.js / User not found')
      }
      req.user = user
      req.token = token
      next()
    }
  } catch (error) {
    console.error(error)
    res.redirect('/login')
  }
}

module.exports = auth
