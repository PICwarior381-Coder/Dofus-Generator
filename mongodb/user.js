const mongoose = require('mongoose')
const str = { type: String, default: '' }
const schema = mongoose.Schema({
    userId: str,
    ip: str,
    port: str,
    username: str,
    password: str,
    proxyAPI: str
})
module.exports = mongoose.model('user', schema)