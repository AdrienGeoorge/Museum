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