const config = require('../config.json')
const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823665644989710416') || message.member.roles.cache.get('838813818904903730')) {
            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('<:important:823909697857912923> Please mention the member to be banned.').then((msg) => msg.delete({timeout: 3000}))
            if (member.id === message.guild.ownerID) return message.channel.send('<:refuse:823910204613722142> You can\'t banned this member.').then((msg) => msg.delete({timeout: 3000}))
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:refuse:823910204613722142> You can\'t banned this member.').then((msg) => msg.delete({timeout: 3000}))
            if (!member.bannable) return message.channel.send('<:refuse:823910204613722142> The bot can\'t banned this member.').then((msg) => msg.delete({timeout: 3000}))
            const duration = parseDuration(args[1])
            if (!duration) return message.channel.send('Please enter a valid duration.')
            const reason = args.slice(2).join(' ') || 'No reason given'
            // Delete check reaction from rules and delete member role
            const rulesMessage = await message.guild.channels.cache.get(config.rules.channel).messages.fetch(config.rules.message)
            await rulesMessage.reactions.resolve(config.rules.name).users.remove(member)
            // Ban and send message
            await member.ban({reason})
            await member.send(`You have been banned from the server for ${humanizeDuration(duration)} for the reason: ${reason}`)
            await bot.channels.cache.get(config.logsModChannel).send(`<:important:823909697857912923> ${member.user.tag} has been banned by ${message.author} for ${humanizeDuration(duration)} for the reason: ${reason}`)
            setTimeout(() => {
                message.guild.members.unban(member)
                member.send('You have been unban from the server.')
                bot.channels.cache.get(config.logsModChannel).send(`<:valide:823910319092531201> ${member.user.tag} has been unban automatically.`)
            }, duration)
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'tempban',
    guildOnly: true
}