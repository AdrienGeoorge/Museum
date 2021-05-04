const fs = require('fs')
const fileName = '../config.json'
const config = require('../config.json')
const {createEmbed, addToObject} = require('../functions')

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            const embed = createEmbed(Object.values(config.reactionRole)[2], 'Servers')
            bot.channels.cache.get(config.channelReaction).send(embed).then(async msg => {
                const clone = Object.values(config.reactionRole)[2]
                config.reactionRole = addToObject(config.reactionRole, msg.id, clone, 2)
                delete config.reactionRole[Object.keys(config.reactionRole)[3]]

                for (const value of config.reactionRole[msg.id].emojis.values()) {
                    await msg.react(value.name)
                }

                fs.writeFile(fileName, JSON.stringify(config), function writeJSON(err) {
                    if (err) return null
                })
            })
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'roleservers',
    guildOnly: true
}