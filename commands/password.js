const MongoUser = require("../library/user")

module.exports = {
    name: 'password',
    aliases: ['setpassword'],
    run: async function(message, args) {
        const mongo = new MongoUser(message.author.id)
        if (!args.length) {
            const { password } = await mongo.get()
            return message.author.send(`Current ${this.name}: ${password}`).catch(()=>{return})
        }
        const password = args[0]
        mongo.update({ $set: { password }})
        return message.author.send(`New ${this.name}: ${password}`).catch(()=>{return})
    }
}