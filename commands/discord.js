const config = require('../config.json')
module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('826908398653800508') || message.member.roles.cache.get('823665644989710416')) {
            let response = `✨┇ Discover ${args[0].toString()} on <@&829832855865524325> ┇\n\n`
            response += '<:discord:823910071103914004> Join our partner\'s community : ' + args[1]
            if (args[2]) {
                await bot.channels.cache.get(config.channelDiscord).send(response, {files: [args[2]]})
            } else {
                await bot.channels.cache.get(config.channelDiscord).send(response)
            }
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'discord',
    guildOnly: true
}