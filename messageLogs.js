const {MessageEmbed} = require('discord.js')
const config = require('./config.json')
const moment = require('moment')

module.exports = (bot) => {
    moment.locale('fr')
    bot.on('messageDelete', async (messageDeleted) => {
        if (!messageDeleted.guild || !messageDeleted.author) return
        let date = moment().utcOffset(120).calendar()
        let deleteEmbed = new MessageEmbed()
            .setTitle('**MESSAGE SUPPRIMÉ**')
            .setColor('#fc3c3c')
            .addField('Auteur', `${messageDeleted.author.tag}`, true)
            .addField('Channel', `${messageDeleted.channel}`, true)
            .addField('Message', `${messageDeleted.content}`)
            .setFooter('Supprimé ' + date.toLowerCase())

        bot.channels.cache.get(config.logsChannel).send(deleteEmbed)
    })

    bot.on('messageUpdate', async (oldMessage, messageUpdate) => {
        if (!messageUpdate.guild || !messageUpdate.author) return
        let date = moment().utcOffset(120).calendar()
        let updateEmbed = new MessageEmbed()
            .setTitle('**MESSAGE MIS À JOUR**')
            .setColor('#a554ec')
            .addField('Auteur', `${messageUpdate.author.tag}`, true)
            .addField('Channel', `${messageUpdate.channel}`, true)
            .addField('Message précédent', `${oldMessage.content}`)
            .addField('Nouveau message', `${messageUpdate.content}`)
            .setFooter('Modifié ' + date.toLowerCase())

        bot.channels.cache.get(config.logsChannel).send(updateEmbed)
    })
}