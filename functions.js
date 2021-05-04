const {MessageEmbed} = require("discord.js")

module.exports.addToObject = function (obj, key, value, index) {
    const temp = {}
    let i = 0
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (i === index && key && value) {
                temp[key] = value
            }
            temp[prop] = obj[prop]
            i++
        }
    }
    if (!index && key && value) {
        temp[key] = value
    }
    return temp
}

module.exports.createEmbed = (data, title) => {
    let roles = ''
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription('Click on a reaction to choose a role')
        .setColor('#EEEADA')
    data.emojis.forEach((el) => {
        roles += `${el.name} - ${el.label}\n`
    })
    embed.addField("The available roles are:", roles)
    return embed
}