const config = require('../config.json')
const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823665644989710416') || message.member.roles.cache.get('838813818904903730')) {
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('<:important:823909697857912923> Please mention the member to be muted.').then((msg) => msg.delete({timeout: 3000}))
            if (member.id === message.guild.ownerID) return message.channel.send('<:refuse:823910204613722142> You can\'t muted this member.').then((msg) => msg.delete({timeout: 3000}))
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:refuse:823910204613722142> You can\'t muted this member.').then((msg) => msg.delete({timeout: 3000}))
            if (!member.manageable) return message.channel.send('<:refuse:823910204613722142> The bot can\'t muted this member.').then((msg) => msg.delete({timeout: 3000}))
            const duration = parseDuration(args[1])
            if (!duration) return message.channel.send('Please enter a valid duration.')
            const reason = args.slice(2).join(' ') || 'No reason given'
            // Add mute role
            await member.roles.add(config.muteRole)
            // Delete check reaction from rules and delete member role
            const rulesMessage = await message.guild.channels.cache.get(config.rules.channel).messages.fetch(config.rules.message)
            await rulesMessage.reactions.resolve(config.rules.name).users.remove(member)
            // Send message to user and logs channel
            await member.send(`You have been muted from the server for ${humanizeDuration(duration)} for the reason: ${reason}.\nPlease read the rules again to get the role **🦄 — Member**.`).catch(() => console.log('Can\'t send a MP'))
            await bot.channels.cache.get(config.logsModChannel).send(`<:important:823909697857912923> ${member.user.tag} has been muted by ${message.author} for ${humanizeDuration(duration)} for the reason: ${reason}`)
            setTimeout(() => {
                if (member.deleted || !member.manageable) return
                member.roles.remove(config.muteRole)
                member.send('You have been unmute from the server.').catch(() => console.log('Can\'t send a MP'))
                bot.channels.cache.get(config.logsModChannel).send(`<:valide:823910319092531201> ${member.user.tag} has been unmute automatically.`)
            }, duration)
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'tempmute',
    guildOnly: true
}