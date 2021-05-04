const {Client, MessageEmbed} = require('discord.js')
const bot = new Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})
const config = require('./config.json')
const messageReaction = require('./messageReaction.js')
const messageLogs = require('./messageLogs.js')
const welcomeMessage = require('./welcomeMessage.js')
const {createWelcomeMessage, setWelcomeChannel, simJoin, simLeave} = require('./welcomeMessage')
const {addPoints, getTopLevels, getRank} = require('./level.js')

const {
    createCountriesEmbed,
    createTalentsEmbed,
    createServersEmbed,
    createNotificationsEmbed,
    addRole,
    deleteRole
} = require('./messageReaction')


bot.login(config.token).then(() => console.log('Connexion du bot...'))

bot.on('ready', () => {
    console.log('Je suis connecté!')
})

bot.on('message', async message => {
        if (message.type !== 'DEFAULT' || message.author.bot) return
        await addPoints(message)
        const args = message.content.trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        if (!commandName.startsWith(config.prefix)) return
        const command = commandName.slice(config.prefix.length)

        if (message.guild) {
            /******* NO ROLES REQUIRED *******/
            // Commands list
            if (command === 'commands') {
                await message.delete()
                const embed = new MessageEmbed()
                    .setTitle('Liste des commandes')
                    .setColor('#EEEADA')
                    .addField('**>social**', 'Show our social networks')
                    .addField('**>top**', 'Show top levels')
                    .addField('**>rank [@user]**', 'Get rank (user is optional)')
                if (message.member.hasPermission('MANAGE_MESSAGES')) {
                    embed.addField('**>delete [number]**', 'Delete [number] messages')
                }
                if (message.member.roles.cache.get('826908398653800508') || message.member.roles.cache.get('823665644989710416')) {
                    embed.addField('**>discord [@roleServer] [lienDiscord] [lienLogo]**', 'Share a partner\'s Discord server')
                }
                if (message.member.roles.cache.get('823665644989710416')) {
                    embed.addField('**>publish [links]**', 'Create an announcement indicating a publication on our social networks')
                    embed.addField('**>star [@user] [links]**', 'Post a message in star channel with the social network\'s link')
                }
                if (message.member.roles.cache.get('823293841288200252')) {
                    embed.addField('**>addRole [countries/talents/servers/notifications] [label] [role] [emoji]**', 'Add a new role')
                    embed.addField('**>deleteRole [countries/talents/servers/notifications] [role]**', 'Delete role')
                }
                await message.channel.send(embed)
            }

            // Social networks list
            if (command === 'social') {
                await message.delete()
                let response = 'Hi ' + message.author.toString() + ', these are our social networks:\n'
                response += '<:insta:823909790370758698>┇ Instagram: https://www.instagram.com/habbomuseum\n'
                response += '<:fb:826046421014806539>┇ Facebook : https://www.facebook.com/habbomuseum\n'
                response += '<:twitter:823909833022373919>┇ Twitter : https://twitter.com/habbomuseum\n'
                response += '<:discord:823910071103914004>┇ Discord : https://discord.gg/wsgwKV3Y7C\n'
                await message.channel.send(response)
            }

            // Get leaderboard
            if (command === 'top') {
                await message.delete()
                await getTopLevels(bot, message.channel)
            }

            // Get rank
            if (command === 'rank') {
                await message.delete()
                await getRank(message)
            }

            /******* ROLES REQUIRED *******/
            // Discord message
            if (command === 'discord') {
                await message.delete()
                // Rôle partner ou staff requis
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
            }

            // Publish update for social networks
            if (command === 'publish') {
                await message.delete()
                // Rôle staff requis
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
            }

            // Delete messages
            if (command === 'delete') {
                await message.delete()
                // Rôle staff ou modérateur requis
                if (message.member.roles.cache.get('823665644989710416') || message.member.roles.cache.get('838813818904903730')) {
                    !message.member.hasPermission('MANAGE_MESSAGES') && message.channel.send('<:refuse:823910204613722142> You don\'t have permission...').then((msg) => msg.delete({timeout: 3000}))
                    if (args[0] !== undefined) {
                        if (args[0] <= 100) {
                            message.channel.bulkDelete(parseInt(args[0]))
                            message.channel.send(`<:valide:823910319092531201> At your service! I have deleted ${args[0]} message(s)!`).then((msg) => msg.delete({timeout: 3000}))
                        } else {
                            message.channel.send('<:refuse:823910204613722142> I cannot delete more than 100 posts at a time and older than 14 days.').then((msg) => msg.delete({timeout: 3000}))
                        }
                    } else {
                        message.channel.send('<:refuse:823910204613722142> You must specify a number of messages to delete!').then((msg) => msg.delete({timeout: 3000}))
                    }
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Star message
            if (command === 'star') {
                await message.delete()
                // Rôle staff requis
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
            }

            // Simulate a join
            if (command === 'simjoin') {
                // Rôle staff requis
                if (message.member.roles.cache.get('823665644989710416')) {
                    await message.delete()
                    await simJoin(bot, message)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Simulate a leave
            if (command === 'simleave') {
                // Rôle staff requis
                if (message.member.roles.cache.get('823665644989710416')) {
                    await message.delete()
                    await simLeave(bot, message)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            /******* ROLE QUEEN *******/
            // Create countries embed
            if (command === 'rolecountries') {
                // Rôle queen requis
                if (message.member.roles.cache.get('823293841288200252')) {
                    await message.delete()
                    createCountriesEmbed(bot)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Create talents embed
            if (command === 'roletalents') {
                // Rôle queen requis
                if (message.member.roles.cache.get('823293841288200252')) {
                    await message.delete()
                    createTalentsEmbed(bot)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Create servers embed
            if (command === 'roleservers') {
                // Rôle queen requis
                if (message.member.roles.cache.get('823293841288200252')) {
                    await message.delete()
                    createServersEmbed(bot)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Create servers embed
            if (command === 'rolenotifications') {
                // Rôle queen requis
                if (message.member.roles.cache.get('823293841288200252')) {
                    await message.delete()
                    createNotificationsEmbed(bot)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Welcome message
            if (command === 'welcomemessage') {
                // Rôle queen requis
                if (message.member.roles.cache.get('823293841288200252')) {
                    await message.delete()
                    createWelcomeMessage(bot)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Add role to embed
            if (command === 'addrole') {
                // Rôle queen requis
                if (message.member.roles.cache.get('823293841288200252')) {
                    await message.delete()
                    await addRole(bot, message, args)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Remove role to embed
            if (command === 'deleterole') {
                // Rôle queen requis
                if (message.member.roles.cache.get('823293841288200252')) {
                    await message.delete()
                    await deleteRole(bot, message, args)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }

            // Set welcome channel
            if (command === 'setwelcome') {
                // Rôle queen requis
                if (message.member.roles.cache.get('823293841288200252')) {
                    await message.delete()
                    await setWelcomeChannel(message.channel)
                } else {
                    message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
                }
            }
        }
    }
)

messageReaction(bot)
messageLogs(bot)
welcomeMessage(bot)