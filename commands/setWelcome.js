const fs = require('fs')
const fileName = '../config.json'
const config = require('../config.json')

module.exports = {
    run: async (message) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            config.channelWelcome = message.channel.id
            fs.writeFile(fileName, JSON.stringify(config), function writeJSON(err) {
                if (err) return null
            })
            await message.channel.send('<:valide:823910319092531201> The welcome channel has been defined here!').then((msg) => msg.delete({timeout: 3000}))
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'setwelcome',
    guildOnly: true
}