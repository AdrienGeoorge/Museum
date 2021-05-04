const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async (message) => {
        await message.delete()
        const embed = new MessageEmbed()
            .setTitle('Commands list')
            .setColor('#EEEADA')
            .addField('**>social**', 'Show our social networks')
            .addField('**>top**', 'Show top levels')
            .addField('**>rank [@user]**', 'Get rank *(user is optional)*')
        // ROLE PARTNER OU STAFF
        if (message.member.roles.cache.get('826908398653800508') || message.member.roles.cache.get('823665644989710416')) {
            embed.addField('**🔶 PARTNER COMMANDS 🔶**', 'Partner role required')
            embed.addField('**>discord [@roleServer] [lienDiscord] [lienLogo]**', 'Share a partner\'s Discord server')
        }
        // ROLE STAFF OU MODERATEUR
        if (message.member.roles.cache.get('823665644989710416') || message.member.roles.cache.get('838813818904903730')) {
            embed.addField('**🔶 STAFF COMMANDS 🔶**', 'Staff or moderator role required')
            embed.addField('**>delete [number]**', 'Delete [number] messages')
            embed.addField('**>publish [links]**', 'Create an announcement indicating a publication on our social networks')
            embed.addField('**>star [@user] [links]**', 'Post a message in star channel with the social network\'s link')
            embed.addField('**>tempMute [@user] [duration] [reason]**', `
            Mute temporarily a member *(reason is not required)*
            Please use **m** for minutes, **h** for hours and **d** for days
            **Example**: >tempMute @Woka 2h30m This is a demo
            `)
            embed.addField('**>mute [@user] [reason]**', 'Mute a member *(reason is not required)*')
            embed.addField('**>unmute [@user]**', 'Unmute a member')
            embed.addField('**>kick [@user] [reason]**', 'Kick a member *(reason is not required)*')
            embed.addField('**>tempBan [@user] [duration] [reason]**', `
            Ban temporarily a member *(reason is not required)*
            Please use **m** for minutes, **h** for hours, **d** for days and **w** for weeks
            **Example**: >tempBan @Woka 2h30m This is a demo
            `)
            embed.addField('**>ban [@user] [reason]**', 'Ban a member *(reason is not required)*')
        }
        // ROLE QUEEN
        if (message.member.roles.cache.get('823293841288200252')) {
            embed.addField('**🔶 ADMIN COMMANDS 🔶**', 'Queen role required')
            embed.addField('**>addRole [countries/talents/servers/notifications] [label] [role] [emoji]**', 'Add a new role')
            embed.addField('**>deleteRole [countries/talents/servers/notifications] [role]**', 'Delete role')
        }
        await message.channel.send(embed)
    },
    name: 'commands',
    guildOnly: false
}