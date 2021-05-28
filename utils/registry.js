const fs = require('fs').promises
const path = require('path')
async function registerCommands(client, dir) {
    const files = await fs.readdir(path.join(__dirname, dir))
    for (const file of files) {
        const stat = await fs.lstat(path.join(__dirname, dir, file))
        if (stat.isDirectory()) registerCommands(client, path.join(dir, file))
        if (file.endsWith('.js')) {
            const cmdName = file.substr(0, file.indexOf('.js'))
            const cmdModule = require(path.join(__dirname, dir, file))
            client.commands.set(cmdName, cmdModule)
        }
    }
}
async function registerEvents(client, dir) {
    const files = await fs.readdir(path.join(__dirname, dir))
    for (file of files) {
        const stat = await fs.lstat(path.join(__dirname, dir, file))
        if (stat.isDirectory()) registerEvents(client, path.join(dir, file))
        if (file.endsWith(".js")) {
            const eventName = file.substring(0, file.indexOf(".js"))
            const eventModule = require(path.join(__dirname, dir, file))
            client.on(eventName, eventModule.bind(null, client))
        }
    }
}

module.exports = {
    registerEvents,
    registerCommands
}