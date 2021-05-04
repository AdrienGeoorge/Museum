const config = require('../config.json')
module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823665644989710416') || message.member.roles.cache.get('838813818904903730')) {
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('<:important:823909697857912923> Please mention the member to be unmute.').then((msg) => msg.delete({timeout: 3000}))
            if (member.id === message.guild.ownerID) return message.channel.send('<:refuse:823910204613722142> You can\'t unmute this member.').then((msg) => msg.delete({timeout: 3000}))
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:refuse:823910204613722142> You can\'t unmute this member.').then((msg) => msg.delete({timeout: 3000}))
            if (!member.manageable) return message.channel.send('<:refuse:823910204613722142> The bot can\'t unmute this member.').then((msg) => msg.delete({timeout: 3000}))
            await member.roles.remove(config.muteRole)
            await member.send('You have been unmute from the server.').catch(() => console.log('Can\'t send a MP'))
            await bot.channels.cache.get(config.logsModChannel).send(`<:valide:823910319092531201> ${member.user.tag} has been unmute by ${message.author}.`)
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'unmute',
    guildOnly: true
}