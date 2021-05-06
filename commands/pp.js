module.exports = {
    run: async (message) => {
        await message.delete()
        const request = message.mentions.users.first() || message.author
        const avatar = request.displayAvatarURL({format: 'png', size: 2048, dynamic: true})
        if (message.mentions.users.first()) {
            await message.channel.send(`Hi ${message.author.username}, here is the avatar of ${request.tag}:\n${avatar}`)
        } else {
            await message.channel.send(`Hi ${message.author.username}, here is your avatar:\n${avatar}`)
        }
    },
    name: 'pp',
    guildOnly: true
}