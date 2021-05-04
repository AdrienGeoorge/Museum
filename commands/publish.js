const config = require('../config.json')
module.exports = {
    run: async (message, args) => {
        await message.delete()
        if (message.member.roles.cache.get('823665644989710416')) {
            if (args.length > 0) {
                let response = '<:important:823909697857912923>┇ NEW POST ON OUR SOCIAL NETWORKS\n\n'
                response += '<:important:823909697857912923>┇ <@&823916492470747156>\n\n'
                response += ':unicorn:┇ A new post has appeared on our social networks.\n'
                response += ':speech_balloon:┇ We invite you to leave a little like, comment and share.\n\n'
                response += '*Do not hesitate to send us your creations in the dedicated channels.*\n\n'

                for (let i = 0; i < args.length; i++) {
                    if (args[i].includes('instagram')) {
                        response += '<:insta:823909790370758698>┇ Instagram : ' + args[i] + '\n'
                    } else if (args[i].includes('facebook')) {
                        response += '<:fb:826046421014806539>┇ Facebook : ' + args[i] + '\n'
                    } else if (args[i].includes('twitter')) {
                        response += '<:twitter:823909833022373919>┇ Twitter : ' + args[i] + '\n'
                    }
                }

                response += '\n<:discord:823910071103914004>┇ Our discord server : https://discord.gg/wsgwKV3Y7C\n\n - ' + message.author.toString()

                bot.channels.cache.get(config.channelSocial).send(response)
            } else {
                message.channel.send('<:refuse:823910204613722142> You must fill in the links of the publications!').then((msg) => msg.delete({timeout: 3000}))
            }
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'publish',
    guildOnly: true
}