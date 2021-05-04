const config = require('../config.json')
module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823665644989710416')) {
            let response = `✨┇ Discover ${args[0].toString()} on social networks ┇ <@&823707326967709747>\n\n`
            for (let i = 1; i < args.length; i++) {
                if (args[i].includes('instagram')) {
                    response += '⭐ <@&829832854484680704> : ' + args[i] + '\n'
                } else if (args[i].includes('facebook')) {
                    response += '⭐ <@&829832853755527168> : ' + args[i] + '\n'
                } else if (args[i].includes('twitter')) {
                    response += '⭐ <@&829832854846308423> : ' + args[i] + '\n'
                } else if (args[i].includes('youtu')) {
                    response += '⭐ <@&834473195184193537> : ' + args[i] + '\n'
                } else {
                    response += '⭐ ' + args[i] + '\n'
                }
            }

            bot.channels.cache.get(config.channelStars).send(response)
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'star',
    guildOnly: true
}