const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] })
client.config = require('./config')
client.commands = new Discord.Collection()

const { registerEvents, registerCommands } = require('./utils/registry')
client.once('ready', async function() {
    client.user.setActivity("PICwarior381#2018");
    console.log("Bot Connecté")
    const mongo = require('./mongo')
    await mongo().then(async () => console.log('Base de donner bien connecté'))

    client.owners = []
    const { owner } = await client.fetchApplication()
    if (owner.members) client.owners = owner.map(u => u.id)
    else client.owners = [owner.id]
    
    await registerEvents(client, '../events')
    await registerCommands(client, '../commands')
    console.log("Entièrement connecté, la connexion est maintenant sur!")
})
client.login(client.config.token)