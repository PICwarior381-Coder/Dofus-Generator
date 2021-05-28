const { MessageEmbed } = require('discord.js')
const ratelimits = new Map()
const cooldowns = new Map()
const humanize = require('humanize-duration')
module.exports = async function (client, message) {
    const embed = new MessageEmbed().setColor('RED')
    const {
        author,
        member,
        content,
        channel,
        guild
    } = message
    if (author.bot) return

    const { prefix } = client.config
    if (!content.startsWith(prefix)) return

    const arguments = content.substr(content.indexOf(prefix) + prefix.length).split(new RegExp(/\s+/))
    const name = arguments.shift().toLowerCase()
    const command = await client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))
    if (!command) return

    const ratelimit = ratelimits.get(author.id)
    if (Date.now() > ratelimit) return author.send(embed.setDescription(member, `You are being ratelimited! Please wait for **${humanize(ratelimit - Date.now())}**`)).catch(() => { return })
    ratelimits.set(author.id, Date.now() + 1000)
    setTimeout(() => ratelimits.delete(author.id), 1000)

    let {
        permissions,
        clientPermissions,
        ownerOnly,
        devOnly,
        minArgs,
        expectedArgs,
        dmAllowed,
        cooldown
    } = command

    // Client Developers Only
    if (devOnly && !client.owner.includes(message.author.id)) return
    // Are DMs allowed?
    if (!guild && !dmAllowed) return
    // Cooldown
    if (cooldown) {
        const end = cooldowns.get(message.author.id)
        if (Date.now() < end) return channel.send(member, embed.setDescription(`You must wait for **${humanize(end - Date.now(), { largest: 1 })}** before calling \`${prefix}${command.name}\` again`))

        let duration = cooldown
        if (typeof cooldown == 'string') duration = ms(cooldown)
        cooldowns.set(message.author.id, Date.now() + duration)
        setTimeout(() => cooldowns.delete(message.author.id), duration)
    }
    if (guild) {
        // Guild Owner
        if (ownerOnly && member.id !== guild.ownerID) return
        // If permissions are required
        if (permissions) {
            const missingPermissions = []
            if (typeof permissions == 'string') permissions = [permissions]
            for (const permission of permissions) if (!member.permissions.has(permission)) missingPermissions.push(`\`${permission}\``)
            if (missingPermissions.length) return
        }
        // If client permissions are required
        if (clientPermissions) {
            const missingPermissions = []
            if (typeof clientPermissions == 'string') clientPermissions = [clientPermissions]
            for (const permission of clientPermissions) if (!guild.me.permissions.has(permission)) missingPermissions.push(`\`${permission}\``)
            if (missingPermissions.length) return
        }
    }
    // Arguments
    if (minArgs && arguments.length < minArgs) return channel.send(member, embed.setDescription(`**Arguments**\n\`${prefix}${name} ${expectedArgs}\``))
    command.run(message, arguments)
}