const fs = require('fs')
const fileName = '../config.json'
const config = require('../config.json')
const {createEmbed} = require('../functions')

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            const collection = args[0]
            const role = args[1].slice(3, args[1].length - 1).replace('&', '')
            let embed
            let emojiSearch

            switch (collection) {
                case 'countries':
                    Object.values(config.reactionRole)[0].emojis.splice(
                        Object.values(config.reactionRole)[0].emojis.findIndex(emoji => {
                            if (emoji.name.includes('<:')) {
                                emojiSearch = emoji.name.replace('>', '').split(':')[2]
                            } else {
                                emojiSearch = emoji.name
                            }
                            return emoji.roles === role
                        }),
                        1
                    )
                    embed = createEmbed(Object.values(config.reactionRole)[0], 'Countries')
                    await bot.channels.cache.get(config.channelReaction).messages.fetch(Object.keys(config.reactionRole)[0]).then(msg => {
                        msg.edit(embed)
                        msg.reactions.cache.get(emojiSearch).remove()
                    })
                    await message.channel.send(`<:valide:823910319092531201> Le rôle a bien été supprimé de la collection pays.`).then(async msg => await msg.delete({timeout: 3000}))
                    break
                case 'talents':
                    Object.values(config.reactionRole)[1].emojis.splice(
                        Object.values(config.reactionRole)[1].emojis.findIndex(emoji => {
                            if (emoji.name.includes('<:')) {
                                emojiSearch = emoji.name.replace('>', '').split(':')[2]
                            } else {
                                emojiSearch = emoji.name
                            }
                            return emoji.roles === role
                        }),
                        1
                    )
                    embed = createEmbed(Object.values(config.reactionRole)[1], 'Talents')
                    await bot.channels.cache.get(config.channelReaction).messages.fetch(Object.keys(config.reactionRole)[1]).then(msg => {
                        msg.edit(embed)
                        msg.reactions.cache.get(emojiSearch).remove()
                    })
                    await message.channel.send(`<:valide:823910319092531201> Le rôle a bien été supprimé de la collection talents.`).then(async msg => await msg.delete({timeout: 3000}))
                    break
                case 'servers':
                    Object.values(config.reactionRole)[2].emojis.splice(
                        Object.values(config.reactionRole)[2].emojis.findIndex(emoji => {
                            if (emoji.name.includes('<:')) {
                                emojiSearch = emoji.name.replace('>', '').split(':')[2]
                            } else {
                                emojiSearch = emoji.name
                            }
                            return emoji.roles === role
                        }),
                        1
                    )
                    embed = createEmbed(Object.values(config.reactionRole)[2], 'Servers')
                    await bot.channels.cache.get(config.channelReaction).messages.fetch(Object.keys(config.reactionRole)[2]).then(msg => {
                        msg.edit(embed)
                        msg.reactions.cache.get(emojiSearch).remove()
                    })
                    await message.channel.send(`<:valide:823910319092531201> Le rôle a bien été supprimé de la collection serveurs.`).then(async msg => await msg.delete({timeout: 3000}))
                    break
                case 'notifications':
                    Object.values(config.reactionRole)[3].emojis.splice(
                        Object.values(config.reactionRole)[3].emojis.findIndex(emoji => {
                            if (emoji.name.includes('<:')) {
                                emojiSearch = emoji.name.replace('>', '').split(':')[2]
                            } else {
                                emojiSearch = emoji.name
                            }
                            return emoji.roles === role
                        }),
                        1
                    )
                    embed = createEmbed(Object.values(config.reactionRole)[3], 'Notifications')
                    await bot.channels.cache.get(config.channelReaction).messages.fetch(Object.keys(config.reactionRole)[3]).then(msg => {
                        msg.edit(embed)
                        msg.reactions.cache.get(emojiSearch).remove()
                    })
                    await message.channel.send(`<:valide:823910319092531201> Le rôle a bien été supprimé de la collection notifications.`).then(async msg => await msg.delete({timeout: 3000}))
                    break
                default:
                    await message.channel.send(`<:refuse:823910204613722142> Oops... il y a eu une erreur!`).then(async msg => await msg.delete({timeout: 3000}))
                    break
            }

            fs.writeFile(fileName, JSON.stringify(config), function writeJSON(err) {
                if (err) return null
            })
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'deleterole',
    guildOnly: true
}