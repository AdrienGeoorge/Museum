const {Client, MessageEmbed} = require('discord.js')
const bot = new Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})
const config = require('./config.json')
const messageReaction = require('./messageReaction.js')
const messageLogs = require('./messageLogs.js')
const {addPoints, getTopLevels, getRank} = require('./level.js')

const {
    createCountriesEmbed,
    createTalentsEmbed,
    createServersEmbed,
    createNotificationsEmbed,
    addRole,
    deleteRole
} = require('./messageReaction')

const {createWelcomeMessage} = require('./welcomeMessage')

bot.login(config.token).then(() => console.log('Connexion du bot...'))

bot.on('ready', () => {
    console.log('Je suis connecté!')
})

bot.on('guildMemberAdd', async member => {
    const message = "**HABBO MUSEUM**\n\nBienvenue, Welcome, Bienvenidos, Bem vindo! :wave:\n\n" +
        ":flag_fr: Veuillez réagir avec la réaction dans le salon #rules pour obtenir le rôle :unicorn: — Membre.\n" +
        "N'oubliez pas de choisir votre pays, votre serveur, vos talents, et les notifications que vous voulez recevoir.\n\n" +
        ":flag_gb: Please react with the reaction in the channel #rules to get the role :unicorn: — Member.\n" +
        "Don't forget to choose your country, your server, your talents, and notifications would you want to receive.\n\n" +
        ":flag_pt: Por favor, reaja com a reação na sala #rules para obter a função :unicorn: — Membro.\n" +
        "Não se esqueça de escolher o seu país, o seu servidor, os seus talentos e as notificações que deseja receber.\n\n" +
        ":flag_es: Por favor, reaccione con la reacción en el salon #rules para conseguir la función :unicorn: — Miembro.\n" +
        "No olvides elegir tu país, tu servidor, tus talentos y las notificaciones que quieres recibir."
    await member.send(message)
})

bot.on('message', async message => {
        if (message.type !== 'DEFAULT' || message.author.bot) return
        await addPoints(message)
        const args = message.content.trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        if (!commandName.startsWith(config.prefix)) return
        const command = commandName.slice(config.prefix.length)

        if (message.guild) {
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

            if (command === 'top') {
                await message.delete()
                await getTopLevels(bot, message.channel)
            }

            if (command === 'rank') {
                await message.delete()
                await getRank(message)
            }

            // Rôle partner requis
            if (message.member.roles.cache.get('826908398653800508') || message.member.roles.cache.get('823665644989710416')) {
                // Delete messages
                if (command === 'discord') {
                    await message.delete()
                    let response = `✨┇ Discover ${args[0].toString()} on <@&829832855865524325> ┇\n\n`
                    response += '<:discord:823910071103914004> Join our partner\'s community : ' + args[1]
                    if (args[2]) {
                        await bot.channels.cache.get(config.channelDiscord).send(response, {files: [args[2]]})
                    } else {
                        await bot.channels.cache.get(config.channelDiscord).send(response)
                    }
                }
            } else {
                message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
            }

            // Rôle staff requis
            if (message.member.roles.cache.get('823665644989710416')) {
                // Publish update for social networks
                if (command === 'publish') {
                    await message.delete()

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
                }

                // Delete messages
                if (command === 'delete') {
                    await message.delete()
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
                }

                // Delete messages
                if (command === 'star') {
                    await message.delete()
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
                }
            } else {
                message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
            }

            // Rôle queen requis
            if (message.member.roles.cache.get('823293841288200252')) {
                // Create countries embed
                if (command === 'rolecountries') {
                    await message.delete()
                    createCountriesEmbed(bot)
                }

                // Create talents embed
                if (command === 'roletalents') {
                    await message.delete()
                    createTalentsEmbed(bot)
                }

                // Create servers embed
                if (command === 'roleservers') {
                    await message.delete()
                    createServersEmbed(bot)
                }

                // Create servers embed
                if (command === 'rolenotifications') {
                    await message.delete()
                    createNotificationsEmbed(bot)
                }

                // Welcome message
                if (command === 'welcomemessage') {
                    await message.delete()
                    createWelcomeMessage(bot)
                }

                // Add role to embed
                if (command === 'addrole') {
                    await message.delete()
                    await addRole(bot, message, args)
                }

                // Remove role to embed
                if (command === 'deleterole') {
                    await message.delete()
                    await deleteRole(bot, message, args)
                }
            } else {
                message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
            }
        }
    }
)

messageReaction(bot)
messageLogs(bot)
