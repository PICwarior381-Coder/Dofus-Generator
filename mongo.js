const mongoose = require('mongoose')
const { mongoPath } = require('./config')
module.exports = async function() {
    return await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}