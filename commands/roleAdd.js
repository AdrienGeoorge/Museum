const fs = require('fs')
const fileName = '../config.json'
const config = require('../config.json')
const {createEmbed} = require('../functions')

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            const collection = args[0]
            const label = args[1]
            const role = args[2].slice(3, args[2].length - 1).replace('&', '')
            let emoji = args[3].replace('\\', '')
            let embed
            let finder

            const object = {
                'name': emoji,
                'roles': role,
                'label': label
            }

            switch (collection) {
                case 'countries':
                    finder = Object.values(config.reactionRole)[0].emojis.find(emoji => {
                        return emoji.roles === role
                    })
                    if (!finder) {
                        Object.values(config.reactionRole)[0].emojis.push(object)
                        embed = createEmbed(Object.values(config.reactionRole)[0], 'Countries')
                        await bot.channels.cache.get(config.channelReaction).messages.fetch(Object.keys(config.reactionRole)[0]).then(msg => {
                            msg.edit(embed)
                            msg.react(emoji)
                        })
                        await message.channel.send(`<:valide:823910319092531201> Le rôle a bien été ajouté à la collection pays.`).then(async msg => await msg.delete({timeout: 3000}))
                    } else {
                        await message.channel.send(`<:refuse:823910204613722142> Oops... il semblerait que le rôle soit déjà présent dans cette collection.`).then(async msg => await msg.delete({timeout: 3000}))
                    }
                    break
                case 'talents':
                    finder = Object.values(config.reactionRole)[1].emojis.find(emoji => {
                        return emoji.roles === role
                    })
                    if (!finder) {
                        Object.values(config.reactionRole)[1].emojis.push(object)
                        embed = createEmbed(Object.values(config.reactionRole)[1], 'Talents')
                        await bot.channels.cache.get(config.channelReaction).messages.fetch(Object.keys(config.reactionRole)[1]).then(msg => {
                            msg.edit(embed)
                            msg.react(emoji)
                        })
                        await message.channel.send(`<:valide:823910319092531201> Le rôle a bien été ajouté à la collection talents.`).then(async msg => await msg.delete({timeout: 3000}))
                    } else {
                        await message.channel.send(`<:refuse:823910204613722142> Oops... il semblerait que le rôle soit déjà présent dans cette collection.`).then(async msg => await msg.delete({timeout: 3000}))
                    }
                    break
                case 'servers':
                    finder = Object.values(config.reactionRole)[2].emojis.find(emoji => {
                        return emoji.roles === role
                    })
                    if (!finder) {
                        Object.values(config.reactionRole)[2].emojis.push(object)
                        embed = createEmbed(Object.values(config.reactionRole)[2], 'Servers')
                        await bot.channels.cache.get(config.channelReaction).messages.fetch(Object.keys(config.reactionRole)[2]).then(msg => {
                            msg.edit(embed)
                            msg.react(emoji)
                        })
                        await message.channel.send(`<:valide:823910319092531201> Le rôle a bien été ajouté à la collection serveurs.`).then(async msg => await msg.delete({timeout: 3000}))
                    } else {
                        await message.channel.send(`<:refuse:823910204613722142> Oops... il semblerait que le rôle soit déjà présent dans cette collection.`).then(async msg => await msg.delete({timeout: 3000}))
                    }
                    break
                case 'notifications':
                    finder = Object.values(config.reactionRole)[3].emojis.find(emoji => {
                        return emoji.roles === role
                    })
                    if (!finder) {
                        Object.values(config.reactionRole)[3].emojis.push(object)
                        embed = createEmbed(Object.values(config.reactionRole)[3], 'Notifications')
                        await bot.channels.cache.get(config.channelReaction).messages.fetch(Object.keys(config.reactionRole)[3]).then(msg => {
                            msg.edit(embed)
                            msg.react(emoji)
                        })
                        await message.channel.send(`<:valide:823910319092531201> Le rôle a bien été ajouté à la collection notifications.`).then(async msg => await msg.delete({timeout: 3000}))
                    } else {
                        await message.channel.send(`<:refuse:823910204613722142> Oops... il semblerait que le rôle soit déjà présent dans cette collection.`).then(async msg => await msg.delete({timeout: 3000}))
                    }
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
    name: 'addrole',
    guildOnly: true
}