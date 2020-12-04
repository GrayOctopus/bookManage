const mongoose = require('mongoose')
const schema = {
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
}
const AdminUser =  mongoose.model('AdminUser',schema)
module.exports = {AdminUser}