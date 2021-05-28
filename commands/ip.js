const MongoUser = require("../library/user")

module.exports = {
    name: 'ip',
    aliases: ['setip'],
    run: async function(message, args) {
        const mongo = new MongoUser(message.author.id)
        if (!args.length) {
            const { ip } = await mongo.get()
            return message.author.send(`Current ${this.name}: ${ip}`).catch(()=>{return})
        }
        const ip = args[0]
        mongo.update({ $set: { ip }})
        return message.author.send(`New ${this.name}: ${ip}`).catch(()=>{return})
    }
}