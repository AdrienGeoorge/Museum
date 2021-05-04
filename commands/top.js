const {MessageEmbed} = require("discord.js")
const db = require('../db.json')

module.exports = {
    run: async (message, args, bot) => {
        await message.delete()
        let top = ''
        let user
        const sort = db.points.sort((a, b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0))
        let embed = new MessageEmbed()
            .setTitle('**TOP LEVELS**')
            .setDescription('Here are the most talkative people on the server.')
            .setColor('#A76C22')
        for (let i = 0; i < 10; i++) {
            if (sort[i]) {
                user = await bot.users.fetch(sort[i].id)
                top += `**${(i + 1)}.** ${user.username}#${user.discriminator} with **${sort[i].points} points**.\n`
            }
        }

        await message.channel.send(embed.addField('**Ranking**', top))
    },
    name: 'top',
    guildOnly: true
}

module.exports = {
    run: async (message) => {
        await message.delete()
        let user
        if (message.mentions.users.first()) {
            user = message.mentions.users.first()
        } else {
            user = message.author
        }

        const sort = db.points.sort((a, b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0))
        const finding = sort.find(data => data.id === user.id)

        let embed = new MessageEmbed()
            .setTitle(`** ${user.username} **`)
            .setColor('#A76C22')

        if (finding) {
            const index = sort.indexOf(finding) + 1
            embed.setDescription(`It is ranked number **${index}**\nOn level **${finding.level}** with **${finding.points}** points`)
        } else {
            embed.setDescription('Not classified: no points received yet')
        }

        await message.channel.send(embed)
    },
    name: 'rank',
    guildOnly: true
}