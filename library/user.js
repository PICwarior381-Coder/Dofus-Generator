const mongo = require('../mongo')
const schema = require('../mongodb/user')
module.exports = class MongoUser {
    constructor(userId) {
        this.userId = userId
    }
    async get() {
        await mongo()
        let data = await schema.findOne({ userId: this.userId })
        if (!data) data = await new schema({ userId: this.userId }).save()
        return data
    }
    async update(data) {
        await mongo()
        return await schema.findOneAndUpdate({ userId: this.userId }, data, { upsert: true, new: true })
    }
}