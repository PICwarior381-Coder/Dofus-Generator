const ms = require("ms")
const map = new Map()
const generate = require('../generate')
const fs = require('fs')
let inUse = false
module.exports = {
    name: 'proxyless',
    run: async function(message, args) {
    if(message.member.roles.cache.find(r => r.name === "VIP")) {
        if (inUse) return message.reply(`this command is currently being in use, try again later!`)
        else{
            message.channel.send(`${message.author}  **${args[0]}** accounts are being generated so be patient !`);
        }

        let number = 1
        if (args[0]) {
            number = Math.floor(args[0])
            if (isNaN(number)) return message.reply(`**${args[0]}** is not a valid number!`)
        }
        if (number < 1) number = 1
        if (number > 100) number = 100

        let data = map.get(message.author.id)
        if (!data) map.set(message.author.id, { accounts: number, endtime: Date.now() + ms('24h') })
        else {
            if (Date.now() >= data.endtime) map.set(message.author.id, { accounts: number, endtime: Date.now() + ms('24h') })
            else {
                if (data.accounts + number >= 100) number = 100 - data.accounts
                if (number <= 0) return message.reply(`you can only generate 100 accounts every 24 hours.`)
                map.set(message.author.id, { accounts: data.accounts + number, endtime: data.endtime })
            }
        }
        const { proxy } = message.client.config
        inUse = true
        getAccounts(message, number, { ip: proxy.ip, port: proxy.port, username: proxy.username, password: proxy.password, proxyAPI: proxy.urlchangeip })
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
    inUse = false
    message.channel.send("The !proxyless command is now avalaible!")
}