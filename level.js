const {MessageEmbed} = require('discord.js')
const fs = require('fs')
const fileName = './db.json'
const db = require('./db.json')
const config = require('./config.json')

const createEmbed = (user, level, emoji, url, message = null) => {
    let embed = new MessageEmbed()
        .setTitle('**LEVEL UP**')
        .setImage(url)
        .setDescription(`**Oh great!**\nCongratulations ${user.toString()}, you up to level ${level} ${emoji}`)
        .setColor('#EEEADA')
    if (message) {
        embed.addField('Reward', message)
    }
    return embed
}

module.exports.addPoints = async (message, bot) => {
    let channel = message.channel
    let user = message.author

    let search = db.points.find(search => {
        return search.id === user.id
    })

    if (search) {
        search.points = search.points + 1
        if (search.level >= 10) {
            search.points += 1
            if (search.points % 750 === 0) {
                search.level += 1
                await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '✨', 'https://i.ibb.co/KqNwXC9/tenor-11.gif'))
            }
        } else {
            switch (search.points) {
                case 150:
                    // LEVEL 1
                    // Send links and images
                    await message.guild.member(user).roles.add('835873182292115477')
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '😌', 'https://i.ibb.co/kcgJt3n/tenor-2.gif', 'Now you can send links and some images. You\'re an verified user.'))
                    break;
                case 300:
                    // LEVEL 2
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '😃', 'https://i.ibb.co/g7s45Zh/tenor.gif'))
                    break;
                case 450:
                    // LEVEL 3
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '🥲', 'https://i.ibb.co/GPMfrZd/tenor-3.gif'))
                    break;
                case 600:
                    // LEVEL 4
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '🤡', 'https://i.ibb.co/x3LCT8b/tenor-4.gif'))
                    break;
                case 750:
                    // LEVEL 5
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '😇', 'https://i.ibb.co/fHF35dY/tenor-5.gif'))
                    break;
                case 1000:
                    // LEVEL 6
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '😱', 'https://i.ibb.co/7vnrWHs/tenor-6.gif'))
                    break;
                case 1250:
                    // LEVEL 7
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '🥳', 'https://i.ibb.co/XCNdjcX/tenor-10.gif'))
                    break;
                case 1750:
                    // LEVEL 8
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '🥰', 'https://i.ibb.co/mRNk2Ct/tenor-7.gif'))
                    break;
                case 2250:
                    // LEVEL 9
                    search.level += 1
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '😈', 'https://i.ibb.co/ZHsbKTr/tenor-8.gif'))
                    break;
                case 3000:
                    // LEVEL 10
                    search.level += 1
                    // Role VIP
                    await message.guild.member(user).roles.add('823664462866808893')
                    await bot.channels.cache.get(config.rankChannel).send(createEmbed(user, search.level, '🤩', 'https://i.ibb.co/JsjWgsK/tenor-9.gif', 'Well done! You\'re now a VIP member. You can access at club channels.'))
                    break;
                default:
                    break;
            }
        }
    } else {
        let create = {
            'id': user.id,
            'points': 1,
            'level': 0
        }

        db.points.push(create)
    }

    fs.writeFile(fileName, JSON.stringify(db), function writeJSON(err) {
        if (err) return null
    })
}