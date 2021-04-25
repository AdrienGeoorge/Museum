const {Client, MessageEmbed} = require('discord.js')
const bot = new Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})
const config = require('./config.json')
const messageReaction = require('./messageReaction.js')
const messageLogs = require('./messageLogs.js')

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
                    .addField('**>social**', 'Permet de voir la liste de nos réseaux sociaux')
                if (message.member.hasPermission('MANAGE_MESSAGES')) {
                    embed.addField('**>delete [number]**', 'Permet de supprimer [number] messages')
                }
                if (message.member.roles.cache.get('823665644989710416')) {
                    embed.addField('**>publish [links]**', 'Permet de créer une nouvelle annonce indiquant qu\'une publication a été faite sur les réseaux sociaux')
                    embed.addField('**>star [@user] [links]**', 'Poster un message dans le channel stars avec le lien du réseau social')
                }
                if (message.member.roles.cache.get('823293841288200252')) {
                    embed.addField('**>rolecountries**', 'Créer le embed pays')
                    embed.addField('**>roletalents**', 'Créer le embed talents')
                    embed.addField('**>roleservers**', 'Créer le embed serveurs')
                    embed.addField('**>rolenotifications**', 'Créer le embed notifications')
                    embed.addField('**>addRole [countries/talents/servers/notifications] [label] [role] [emoji]**', 'Permet d\'ajouter un rôle à une liste du channel rôles')
                    embed.addField('**>deleteRole [countries/talents/servers/notifications] [role]**', 'Permet de supprimer un rôle à une liste du channel rôles')
                }
                await message.channel.send(embed)
            }

            // Social networks list
            if (command === 'social') {
                await message.delete()
                let response = 'Salut ' + message.author.toString() + ', voici nos réseaux:\n'
                response += '<:insta:823909790370758698>┇ Instagram: https://www.instagram.com/habbomuseum\n'
                response += '<:fb:826046421014806539>┇ Facebook : https://www.facebook.com/habbomuseum\n'
                response += '<:twitter:823909833022373919>┇ Twitter : https://twitter.com/habbomuseum\n'
                response += '<:discord:823910071103914004>┇ Discord : https://discord.gg/wsgwKV3Y7C\n'
                await message.channel.send(response)
            }

            // Rôle staff requis
            if (message.member.roles.cache.get('823665644989710416')) {
                // Publish update for social networks
                if (command === 'publish') {
                    await message.delete()

                    if (args.length > 0) {
                        let response = '<:important:823909697857912923>┇ NOUVEAU POST SUR NOS RÉSEAUX\n\n'
                        response += '<:important:823909697857912923>┇ <@&823916492470747156>\n\n'
                        response += ':unicorn:┇ Un nouveau post a vu le jour sur nos réseaux sociaux.\n'
                        response += ':speech_balloon:┇ Nous vous invitons à lâcher un petit j’aime, un commentaire et à partager.\n\n'
                        response += '*N’hésitez pas à nous envoyer vos créations dans les salons dédiés*\n\n'

                        for (let i = 0; i < args.length; i++) {
                            if (args[i].includes('instagram')) {
                                response += '<:insta:823909790370758698>┇ Instagram : ' + args[i] + '\n'
                            } else if (args[i].includes('facebook')) {
                                response += '<:fb:826046421014806539>┇ Facebook : ' + args[i] + '\n'
                            } else if (args[i].includes('twitter')) {
                                response += '<:twitter:823909833022373919>┇ Twitter : ' + args[i] + '\n'
                            }
                        }

                        response += '\n<:discord:823910071103914004>┇ Notre serveur discord : https://discord.gg/wsgwKV3Y7C\n\n - ' + message.author.toString()

                        bot.channels.cache.get(config.channelSocial).send(response)
                    } else {
                        message.channel.send('<:refuse:823910204613722142> Tu dois renseigner les liens des publications !').then((msg) => msg.delete({timeout: 3000}))
                    }
                }

                // Delete messages
                if (command === 'delete') {
                    await message.delete()
                    !message.member.hasPermission('MANAGE_MESSAGES') && message.channel.send('<:refuse:823910204613722142> Tu n\'as pas la permission...').then((msg) => msg.delete({timeout: 3000}))
                    if (args[0] !== undefined) {
                        if (args[0] <= 100) {
                            message.channel.bulkDelete(parseInt(args[0]))
                            message.channel.send(`<:valide:823910319092531201> À ton service! J'ai supprimé ${args[0]} message(s)!`).then((msg) => msg.delete({timeout: 3000}))
                        } else {
                            message.channel.send('<:refuse:823910204613722142> Je ne peux pas supprimer plus de 100 messages à la fois et de plus de 14 jours.').then((msg) => msg.delete({timeout: 3000}))
                        }
                    } else {
                        message.channel.send('<:refuse:823910204613722142> Tu dois spécifier un nombre de messages à supprimer!').then((msg) => msg.delete({timeout: 3000}))
                    }
                }

                // Delete messages
                if (command === 'star') {
                    await message.delete()
                    let response = `✨┇ Découvrez ${args[0].toString()} sur les réseaux sociaux ┇ <@&823707326967709747>\n\n`

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
                message.channel.send('<:refuse:823910204613722142> Tu n\as pas les droits pour éxécuter cette commande').then((msg) => msg.delete({timeout: 3000}))
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
                message.channel.send('<:refuse:823910204613722142> Tu n\as pas les droits pour éxécuter cette commande').then((msg) => msg.delete({timeout: 3000}))
            }
        }
    }
)

messageReaction(bot)
messageLogs(bot)