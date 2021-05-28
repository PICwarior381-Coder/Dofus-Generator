const MongoUser = require("../library/user")

module.exports = {
    name: 'proxyAPI',
    aliases: ['setproxyapi'],
    run: async function(message, args) {
        const mongo = new MongoUser(message.author.id)
        if (!args.length) {
            const { proxyAPI } = await mongo.get()
            return message.author.send(`Current ${this.name}: ${proxyAPI}`).catch(()=>{return})
        }
        const proxyAPI = args[0]
        mongo.update({ $set: { proxyAPI }})
        return message.author.send(`New ${this.name}: ${proxyAPI}`).catch(()=>{return})
    }
}