const fs = require('fs')
const fileName = './config.json'
const config = require('./config.json')
const {registerFont, createCanvas, loadImage} = require('canvas')
const {MessageAttachment} = require('discord.js')

module.exports = client => {
    client.on('guildMemberAdd', async member => {
        const message = "**HABBO MUSEUM**\n\nBienvenue, Welcome, Bienvenidos, Bem vindo! :wave:\n\n" +
            ":flag_fr: Veuillez réagir avec la réaction dans le salon #rules pour obtenir le rôle :unicorn: — Membre.\n" +
            "N'oubliez pas de choisir votre pays, votre serveur, vos talents, et les notifications que vous voulez recevoir.\n\n" +
            ":flag_gb: Please react with the reaction in the channel #rules to get the role :unicorn: — Member.\n" +
            "Don't forget to choose your country, your server, your talents, and notifications would you want to receive.\n\n" +
            ":flag_pt: Por favor, reaja com a reação na sala #rules para obter a função :unicorn: — Membro.\n" +
            "Não se esqueça de escolher o seu país, o seu servidor, os seus talentos e as notificações que deseja receber.\n\n" +
            ":flag_es: Por favor, reaccione con la reacción en el salon #rules para conseguir la función :unicorn: — Miembro.\n" +
            "No olvides elegir tu país, tu servidor, tus talentos y las notificaciones que quieres recibir."

        member.send(message).then(() => {
            console.log('Send a MP')
        }).catch(() => {
            console.log('Can\'t send a MP')
        })

        const {guild} = member
        const channel = guild.channels.cache.get(config.channelWelcome)

        registerFont('./assets/LEMONMILK-Medium.otf', {family: 'Lemon'})
        const canvas = createCanvas(800, 400)
        const ctx = canvas.getContext('2d')

        const background = await loadImage('./assets/banner.jpg')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = '#EEEADA'
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.shadowColor = 'black'
        ctx.shadowBlur = 8
        ctx.shadowOffsetY = -2
        ctx.fillStyle = '#ffffff'
        ctx.font = '45px "Lemon"'
        let text = 'WELCOME'
        let x = canvas.width / 2 - ctx.measureText(text).width / 2
        ctx.fillText(text, x, 310)
        // Display member tag
        ctx.font = '30px "Lemon"'
        text = `${member.user.tag.toUpperCase()}`
        x = canvas.width / 2 - ctx.measureText(text).width / 2
        ctx.fillText(text, x, 340)
        // Display member count
        ctx.font = '20px "Lemon"'
        text = `YOU ARE THE N°${guild.memberCount}...`
        x = canvas.width / 2 - ctx.measureText(text).width / 2
        ctx.fillText(text, x, 375)
        ctx.restore()
        ctx.beginPath()
        ctx.arc(canvas.width / 2, 150, 100, 0, Math.PI * 2, true)
        ctx.strokeStyle = '#fff'
        ctx.fillStyle = '#fff'
        ctx.lineWidth = 10
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        ctx.clip()
        const avatar = await loadImage(member.user.displayAvatarURL({format: 'jpg'}))
        ctx.drawImage(avatar, (canvas.width / 2 - avatar.width / 2) - 36, 50, 200, 200)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
        channel.send('', attachment)
    })
}

module.exports.createWelcomeMessage = (bot) => {
    let message = "🇫🇷  **__R È G L E M E N T__**\n\n" +
        "Le règlement d'**Habbo Museum** détermine les règles de comportement et d’attitude à avoir dans l’enceinte du serveur discord. En devenant membre vous acceptez ce règlement et vous devez le respecter.\n\n" +
        "En cas de non respect des règles vous pourrez avoir des sanctions qui peuvent aller d’un simple mute, à un kick temporaire voir un bannissement définitif du serveur.\n\n" +
        "🔹 Tous propos injurieux, diffamatoires, humiliantes, provocantes, menaçantes envers autrui ne sont pas tolérés.\n\n" +
        "🔸 Toute insulte, attaque à l’égard d’un physique, d’une religion ou même d’une orientation sexuelle est prohibée.\n\n" +
        "🔹 Toute insultes ou manque de respect envers un membre du staff ne sera pas acceptée.\n\n" +
        "🔸 Toute publicité est interdite.\n\n" +
        "🔹 Toute image dégradante à caractère pornographique, homophobe, xénophobe ou insultante ne sera pas tolérée.\n\n" +
        "🔸 Tout spam ou troll ne seront pas toléré.\n\n" +
        "Veuillez réagir avec la réaction ci-dessous pour obtenir le rôle **🦄 — Membre**.\n\n"

    message += "🇬🇧  **__R U L E S__**\n\n" +
        "The **Habbo Museum**’s regulation determine the rules of behavior and attitude expected within the discord server. By becoming a member, you accept these rules and you must respect them.\n\n" +
        "In case of non-compliance with the rules, you may will have penalties which can range from a simple mute, to a temporary kick or to a permanent ban from the server.\n\n" +
        "🔹 All abusive, defamatory, humiliating, provocative, threatening remarks towards others are not tolerated.\n\n" +
        "🔸 Any insult, attack against a look, a religion or even a sexual orientation is prohibited.\n\n" +
        "🔹 Any insult or disrespect towards a staff member will not be accepted.\n\n" +
        "🔸 All advertising is not welcoming here.\n\n" +
        "🔹 Any degrading picture containing pornographic, homophobic, xenophobic or something insulting will not be accepted at all.\n\n" +
        "🔸 Any spam or troll will not be admitted.\n\n" +
        "Please react with the reaction below to get the role **🦄 — Member**.\n\n"

    let message2 = "🇵🇹  **__R E G R A S__**\n\n" +
        "As regras do **Habbo Museu** determinam as regras de comportamento e atitude a serem observadas dentro do servidor discord. Ao se tornar um membro, você aceita essas regras e deve respeitá-las.\n\n" +
        "No caso de não conformidade com as regras, você pode ter penalidades que podem variar de um simples mudo, a um chute temporário ou a um banimento permanente do servidor.\n\n" +
        "🔹 Todos os comentários abusivos, difamatórios, humilhantes, provocativos e ameaçadores para os outros não são tolerados.\n\n" +
        "🔸 Qualquer insulto, at aque ao físico, religião ou mesmo orientação sexual é proibido.\n\n" +
        "🔹 Quaisquer insultos ou desrespeito a um membro da equipe não serão aceitos.\n\n" +
        "🔸 Toda publicidade é proibida.\n\n" +
        "🔹 Qualquer imagem pornográfica degradante, homofóbica, xenófoba ou insultuosa não será tolerada.\n\n" +
        "🔸 Qualquer spam ou troll não será tolerado.\n\n" +
        "Por favor, reaja com a reação abaixo para obter a função **🦄 — Membro**.\n\n"

    message2 += "🇪🇸  **__R E G L A S__**\n\n" +
        "El reglamento del **Museo de Habbo** determina las normas de comportamiento y actitud que se deben tener en el servidor Discord. Al hacerse miembro, acepta estas normas y debe respetarlas.\n\n" +
        "Si no respetas las reglas, puedes ser castigado con un simple mute, un kick temporal o incluso un baneo permanente del discord.\n\n" +
        "🔹 No se toleran los comentarios abusivos, difamatorios, humillantes, provocativos o amenazantes hacia los demás.\n\n" +
        "🔸 Están prohibidos todos los insultos, los ataques a un físico, a una religión o incluso a una orientación sexual.\n\n" +
        "🔹 No se aceptarán insultos o faltas de respeto hacia un miembro del personal.\n\n" +
        "🔸 Se prohíbe todo tipo de publicidad.\n\n" +
        "🔹 No se tolerará ninguna imagen degradante de carácter pornográfico, homófobo, xenófobo o insultante.\n\n" +
        "🔸 No se tolerará ningún tipo de spam o troll.\n\n" +
        "Por favor, reaccione con la reacción de abajo para conseguir la función **🦄 — Miembro**."

    bot.channels.cache.get(config.rules.channel).send(message)

    bot.channels.cache.get(config.rules.channel).send(message2).then(async msg => {
        await msg.react(config.rules.name)
        config.rules.message = msg.id
        fs.writeFile(fileName, JSON.stringify(config), function writeJSON(err) {
            if (err) return null
        })
    })
}

module.exports.setWelcomeChannel = async channel => {
    config.channelWelcome = channel.id
    fs.writeFile(fileName, JSON.stringify(config), function writeJSON(err) {
        if (err) return null
    })
    await channel.send('<:valide:823910319092531201> The welcome channel has been defined here!').then((msg) => msg.delete({timeout: 3000}))
}

module.exports.simJoin = async (bot, message) => {
    bot.emit('guildMemberAdd', message.member)
}