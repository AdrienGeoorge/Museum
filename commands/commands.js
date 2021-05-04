const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async (message) => {
        await message.delete()
        const embed = new MessageEmbed()
            .setTitle('Commands list')
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
    },
    name: 'commands',
    guildOnly: true
}