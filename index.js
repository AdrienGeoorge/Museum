fs = require('fs')
const moment = require('moment')
const config = require('./config.json')
const {Client, Collection, MessageAttachment, MessageEmbed} = require('discord.js')
const {registerFont, createCanvas, loadImage} = require('canvas')
const {addPoints} = require('./level.js')
cooldown = new Set()

const bot = new Client({
    fetchAllMembers: true,
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})

moment.locale('fr')

bot.login(config.token).then(() => console.log('Connexion du bot...'))
bot.commands = new Collection()

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        bot.commands.set(command.name, command)
    })
})

bot.on('ready', () => {
    console.log('Je suis connecté!')
})

bot.on('message', async message => {
        if (message.type !== 'DEFAULT' || message.author.bot) return

        if (!cooldown.has(message.author.id)) {
            await addPoints(message)
        }
        cooldown.add(message.author.id)
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, 10000)

        const args = message.content.trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        if (!commandName.startsWith(config.prefix)) return
        const command = bot.commands.get(commandName.slice(config.prefix.length))
        if (!command) return
        if (command.guildOnly && !message.guild) return message.channel.send('This command can only be used in a server.')
        command.run(message, args, bot)
    }
)

bot.on('guildMemberAdd', async member => {
    const message = "**HABBO MUSEUM**\n\nBienvenue, Welcome, Bienvenidos, Bem vindo! :wave:\n\n" +
        ":flag_fr: Veuillez réagir avec la réaction dans le salon #rules pour obtenir le rôle :unicorn: — Membre.\n" +
        "N'oubliez pas de choisir votre pays, votre serveur, vos talents, et les notifications que vous voulez recevoir.\n\n" +
        ":flag_gb: Please react with the reaction in the channel #rules to get the role :unicorn: — Member.\n" +
        "Don't forget to choose your country, your server, your talents, and notifications would you want to receive.\n\n" +
        ":flag_pt: Por favor, reaja com a reação na sala #rules para obter a função :unicorn: — Membro.\n" +
        "Não se esqueça de escolher o seu país, o seu servidor, os seus talentos e as notificações que deseja receber.\n\n" +
        ":flag_es: Por favor, reaccione con la reacción en el salon #rules para conseguir la función :unicorn: — Miembro.\n" +
        "No olvides elegir tu país, tu servidor, tus talentos y las notificaciones que quieres recibir."

    member.send(message).then(() => {
        console.log('New member - Send a MP')
    }).catch(() => {
        console.log('New member - Can\'t send a MP')
    })

    const {guild} = member
    const channel = guild.channels.cache.get(config.channelWelcome)

    registerFont('./assets/LEMONMILK-Medium.otf', {family: 'Lemon'})
    const canvas = createCanvas(800, 400)
    const ctx = canvas.getContext('2d')

    const background = await loadImage('./assets/welcomeBanner.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#EEEADA'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.shadowColor = 'black'
    ctx.shadowBlur = 8
    ctx.shadowOffsetY = -2
    ctx.fillStyle = '#ffffff'
    ctx.font = '50px "Lemon"'
    let text = 'WELCOME'
    let x = (canvas.width / 2 - ctx.measureText(text).width / 2) + 155
    ctx.fillText(text, x, 190)
    // Display member tag
    ctx.font = '35px "Lemon"'
    text = `${member.user.tag.toUpperCase()}`
    x = (canvas.width / 2 - ctx.measureText(text).width / 2) + 155
    ctx.fillText(text, x, 225)
    // Display member count
    ctx.font = '25px "Lemon"'
    text = `YOU ARE THE N°${guild.memberCount}...`
    x = (canvas.width / 2 - ctx.measureText(text).width / 2) + 155
    ctx.fillText(text, x, 260)
    ctx.restore()
    ctx.beginPath()
    ctx.arc(175, 200, 100, 0, Math.PI * 2, true)
    ctx.strokeStyle = '#fff'
    ctx.fillStyle = '#fff'
    ctx.lineWidth = 10
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.clip()
    const avatar = await loadImage(member.user.displayAvatarURL({format: 'png', size: 2048, dynamic: true}))
    ctx.drawImage(avatar, 75, 100, 200, 200)

    const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
    channel.send('', attachment)
})
bot.on('guildMemberRemove', async member => {
    const {guild} = member
    const channel = guild.channels.cache.get(config.channelWelcome)

    registerFont('./assets/LEMONMILK-Medium.otf', {family: 'Lemon'})
    const canvas = createCanvas(800, 400)
    const ctx = canvas.getContext('2d')

    const background = await loadImage('./assets/welcomeBanner.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#EEEADA'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.shadowColor = 'black'
    ctx.shadowBlur = 8
    ctx.shadowOffsetY = -2
    ctx.fillStyle = '#ffffff'
    ctx.font = '50px "Lemon"'
    let text = 'GOODBYE'
    let x = (canvas.width / 2 - ctx.measureText(text).width / 2) + 155
    ctx.fillText(text, x, 190)
    ctx.font = '35px "Lemon"'
    text = `${member.user.tag.toUpperCase()}`
    x = (canvas.width / 2 - ctx.measureText(text).width / 2) + 155
    ctx.fillText(text, x, 225)
    ctx.font = '25px "Lemon"'
    text = 'WE ARE SAD TO SEE YOU LEAVE...'
    x = (canvas.width / 2 - ctx.measureText(text).width / 2) + 155
    ctx.fillText(text, x, 260)
    ctx.restore()
    ctx.beginPath()
    ctx.arc(175, 200, 100, 0, Math.PI * 2, true)
    ctx.strokeStyle = '#fff'
    ctx.fillStyle = '#fff'
    ctx.lineWidth = 10
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.clip()
    const avatar = await loadImage(member.user.displayAvatarURL({format: 'png', size: 2048, dynamic: true}))
    ctx.drawImage(avatar, 75, 100, 200, 200)

    const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
    channel.send('', attachment)
})

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

bot.on('messageDelete', async (messageDeleted) => {
    if (!messageDeleted.guild || !messageDeleted.author) return
    if (messageDeleted.author.bot) return
    let date = moment().utcOffset(120).calendar()
    let deleteEmbed = new MessageEmbed()
        .setTitle('**MESSAGE SUPPRIMÉ**')
        .setColor('#fc3c3c')
        .addField('Auteur', `${messageDeleted.author.tag}`, true)
        .addField('Channel', `${messageDeleted.channel}`, true)
        .addField('Message', `${messageDeleted.content} `)
        .setFooter('Supprimé ' + date.toLowerCase())

    bot.channels.cache.get(config.logsChannel).send(deleteEmbed)
})
bot.on('messageUpdate', async (oldMessage, messageUpdate) => {
    if (!messageUpdate.guild || !messageUpdate.author) return
    if (messageUpdate.author.bot) return
    let date = moment().utcOffset(120).calendar()
    let updateEmbed = new MessageEmbed()
        .setTitle('**MESSAGE MIS À JOUR**')
        .setColor('#a554ec')
        .addField('Auteur', `${messageUpdate.author.tag}`, true)
        .addField('Channel', `${messageUpdate.channel}`, true)
        .addField('Message précédent', `${oldMessage.content} `)
        .addField('Nouveau message', `${messageUpdate.content} `)
        .setFooter('Modifié ' + date.toLowerCase())

    bot.channels.cache.get(config.logsChannel).send(updateEmbed)
})