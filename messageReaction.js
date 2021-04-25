const {MessageEmbed} = require('discord.js')
const fs = require('fs')
const fileName = './config.json'
const config = require('./config.json')

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
        .setDescription('Cliquez sur une réaction pour choisir un rôle')
        .setColor('#EEEADA')
    data.emojis.forEach((el) => {
        roles += `${el.name} - ${el.label}\n`
    })
    embed.addField("Les rôles disponibles:", roles)
    return embed
}

module.exports = (bot) => {
    bot.on('messageReactionAdd', async (reaction, user) => {
            if (!reaction.message.guild || user.bot) return
            if (reaction.message.id !== config.rules.message) {
                const reactionRoleElem = config.reactionRole[reaction.message.id]
                if (!reactionRoleElem) return
                const prop = reaction.emoji.id ? 'id' : 'name'
                const emoji = reactionRoleElem.emojis.find(emoji => {
                    if (emoji.name.includes('<:')) {
                        return emoji.name.replace('>', '').split(':')[2] === reaction.emoji[prop]
                    } else {
                        return emoji.name === reaction.emoji[prop]
                    }
                })
                if (emoji) {
                    await reaction.message.guild.member(user).roles.add(emoji.roles)
                } else {
                    await reaction.users.remove(user)
                }
            } else {
                if (reaction.emoji.id === config.rules.name) {
                    await reaction.message.guild.member(user).roles.add(config.rules.roles)
                }
            }
        }
    )

    bot.on('messageReactionRemove', async (reaction, user) => {
        if (!reaction.message.guild || user.bot) return
        if (reaction.message.id !== config.rules.message) {
            const reactionRoleElem = config.reactionRole[reaction.message.id]
            if (!reactionRoleElem || !reactionRoleElem.removable) return
            const prop = reaction.emoji.id ? 'id' : 'name'
            const emoji = reactionRoleElem.emojis.find(emoji => {
                if (emoji.name.includes('<:')) {
                    return emoji.name.replace('>', '').split(':')[2] === reaction.emoji[prop]
                } else {
                    return emoji.name === reaction.emoji[prop]
                }
            })
            if (emoji) await reaction.message.guild.member(user).roles.remove(emoji.roles)
        } else {
            if (reaction.emoji.id === config.rules.name) {
                await reaction.message.guild.member(user).roles.remove(config.rules.roles)
            }
        }
    })
}

module.exports.createCountriesEmbed = (bot) => {
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
}

module.exports.createTalentsEmbed = (bot) => {
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
}

module.exports.createServersEmbed = (bot) => {
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
}

module.exports.createNotificationsEmbed = (bot) => {
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
}

module.exports.addRole = async (bot, message, args) => {
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
}

module.exports.deleteRole = async (bot, message, args) => {
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
}