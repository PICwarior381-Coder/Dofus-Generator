const generate = require('../generate')
const MongoUser = require('../library/user')
const fs = require('fs')
module.exports = {
    name: 'generate',
    dmAllowed: true,
    run: async function(message, args) {
        if(message.member.roles.cache.find(r => r.name === "VIP")) {
        let number = 1
        if (args[0]) {
            number = Math.floor(args[0])
            if (isNaN(number)) return message.reply(`**${args[0]}** is not a valid number!`)
            else{
                message.channel.send(`${message.author}  **${args[0]}** accounts are being generated so be patient !`);
            }
        }
        if (number < 1) number = 1
        if (number > 100) number = 100

        const database = await new MongoUser(message.author.id).get()
        getAccounts(message, number, database)
    }
    else{
        message.channel.send(`${message.author} To use this command you must be a VIP !`);

    }
}
}
async function getAccounts(message, number, database) {
    await generate(message, number, database)
    await message.author.send({ files: [`./${message.author.id}.txt`]}).catch(console.log)
    fs.unlinkSync(`./${message.author.id}.txt`)
}