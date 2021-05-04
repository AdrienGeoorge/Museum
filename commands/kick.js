const config = require('../config.json')
module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823665644989710416') || message.member.roles.cache.get('838813818904903730')) {
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('<:important:823909697857912923> Please mention the member to be kicked.').then((msg) => msg.delete({timeout: 3000}))
            if (member.id === message.guild.ownerID) return message.channel.send('<:refuse:823910204613722142> You can\'t kicked this member.').then((msg) => msg.delete({timeout: 3000}))
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:refuse:823910204613722142> You can\'t kicked this member.').then((msg) => msg.delete({timeout: 3000}))
            if (!member.kickable) return message.channel.send('<:refuse:823910204613722142> The bot can\'t kicked this member.').then((msg) => msg.delete({timeout: 3000}))
            const reason = args.slice(1).join(' ') || 'No reason given'
            // Delete check reaction from rules and delete member role
            const rulesMessage = await message.guild.channels.cache.get(config.rules.channel).messages.fetch(config.rules.message)
            await rulesMessage.reactions.resolve(config.rules.name).users.remove(member)
            // Kick and send message
            await member.kick(reason)
            await member.send(`You have been kicked from the server for the reason: ${reason}`).catch(() => console.log('Can\'t send a MP'))
            await bot.channels.cache.get(config.logsModChannel).send(`<:important:823909697857912923> ${member.user.tag} has been kicked by ${message.author} for the reason: ${reason}`)
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'kick',
    guildOnly: true
}