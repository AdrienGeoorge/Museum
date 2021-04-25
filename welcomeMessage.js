const fs = require('fs')
const fileName = './config.json'
const config = require('./config.json')

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
