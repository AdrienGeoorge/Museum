const fs = require('fs')
const fileName = '../config.json'
const config = require('../config.json')
const {MessageEmbed} = require("discord.js")

const addToObject = function (obj, key, value, index) {
    const temp = {}
    let i = 0
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (i === index && key && value) {
                temp[key] = value
            }
            temp[prop] = obj[prop]
            i++
        }
    }
    if (!index && key && value) {
        temp[key] = value
    }
    return temp
}

const createEmbed = (data, title) => {
    let roles = ''
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription('Click on a reaction to choose a role')
        .setColor('#EEEADA')
    data.emojis.forEach((el) => {
        roles += `${el.name} - ${el.label}\n`
    })
    embed.addField("The available roles are:", roles)
    return embed
}

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            await message.delete()
            const embed = createEmbed(Object.values(config.reactionRole)[0], 'Countries')
            bot.channels.cache.get(config.channelReaction).send(embed).then(async msg => {
                const clone = Object.values(config.reactionRole)[0]
                config.reactionRole = addToObject(config.reactionRole, msg.id, clone, 0)
                delete config.reactionRole[Object.keys(config.reactionRole)[1]]

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
    name: 'rolecountries',
    guildOnly: true
}

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            await message.delete()
            const embed = createEmbed(Object.values(config.reactionRole)[1], 'Talents')
            bot.channels.cache.get(config.channelReaction).send(embed).then(async msg => {
                const clone = Object.values(config.reactionRole)[1]
                config.reactionRole = addToObject(config.reactionRole, msg.id, clone, 1)
                delete config.reactionRole[Object.keys(config.reactionRole)[2]]

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
    name: 'roletalents',
    guildOnly: true
}

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            await message.delete()
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

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            await message.delete()
            const embed = createEmbed(Object.values(config.reactionRole)[3], 'Notifications')
            bot.channels.cache.get(config.channelReaction).send(embed).then(async msg => {
                const clone = Object.values(config.reactionRole)[3]
                config.reactionRole = addToObject(config.reactionRole, msg.id, clone, 3)
                delete config.reactionRole[Object.keys(config.reactionRole)[4]]

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
    name: 'rolenotifications',
    guildOnly: true
}

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

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        if (message.member.roles.cache.get('823293841288200252')) {
            await message.delete()
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