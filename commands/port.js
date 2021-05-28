const MongoUser = require("../library/user")

module.exports = {
    name: 'port',
    aliases: ['setport'],
    run: async function(message, args) {
        const mongo = new MongoUser(message.author.id)
        if (!args.length) {
            const { port } = await mongo.get()
            return message.author.send(`Current ${this.name}: ${port}`).catch(()=>{return})
        }
        const port = args[0]
        mongo.update({ $set: { port }})
        return message.author.send(`New ${this.name}: ${port}`).catch(()=>{return})
    }
}