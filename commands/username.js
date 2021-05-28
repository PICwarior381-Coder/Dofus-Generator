const MongoUser = require("../library/user")

module.exports = {
    name: 'username',
    aliases: ['setusername'],
    run: async function(message, args) {
        const mongo = new MongoUser(message.author.id)
        if (!args.length) {
            const { username } = await mongo.get()
            return message.author.send(`Current ${this.name}: ${username}`).catch(()=>{return})
        }
        const username = args[0]
        mongo.update({ $set: { username }})
        return message.author.send(`New ${this.name}: ${username}`).catch(()=>{return})
    }
}