module.exports = {
    run: async (message) => {
        await message.delete()
        let response = 'Hi ' + message.author.toString() + ', these are our social networks:\n'
        response += '<:insta:823909790370758698>┇ Instagram: https://www.instagram.com/habbomuseum\n'
        response += '<:fb:826046421014806539>┇ Facebook : https://www.facebook.com/habbomuseum\n'
        response += '<:twitter:823909833022373919>┇ Twitter : https://twitter.com/habbomuseum\n'
        response += '<:discord:823910071103914004>┇ Discord : https://discord.gg/wsgwKV3Y7C\n'
        await message.channel.send(response)
    },
    name: 'social',
    guildOnly: true
}