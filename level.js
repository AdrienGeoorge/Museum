const {MessageEmbed} = require('discord.js')
const fs = require('fs')
const fileName = './db.json'
const db = require('./db.json')

const createEmbed = (user, level, emoji, url) => {
    return new MessageEmbed()
        .setTitle('**LEVEL UP**')
        .setImage(url)
        .setDescription('**Oh great!**\nCongratulations ' + user.toString() + ', you up to level ' + level + ' ' + emoji)
        .setColor('#EEEADA')
}

module.exports.addPoints = async (channel, user) => {
    let search = db.points.find(search => {
        return search.id === user.id
    })

    if (search) {
        search.points = search.points + 1
        switch (search.points) {
            case 50:
                search.level += 1
                channel.send(createEmbed(user, search.level, '😀', 'https://i.ibb.co/kcgJt3n/tenor-2.gif'))
                break;
            case 150:
                // LEVEL 2
                // Give role for send links and images
                search.level += 1
                channel.send(createEmbed(user, search.level, '😃', 'https://i.ibb.co/g7s45Zh/tenor.gif'))
                break;
            case 250:
                // LEVEL 3
                search.level += 1
                channel.send(createEmbed(user, search.level, '🥲', 'https://i.ibb.co/GPMfrZd/tenor-3.gif'))
                break;
            case 350:
                // LEVEL 4
                // Unblock emoji
                search.level += 1
                channel.send(createEmbed(user, search.level, '🤡', 'https://i.ibb.co/x3LCT8b/tenor-4.gif'))
                break;
            case 450:
                // LEVEL 5
                search.level += 1
                channel.send(createEmbed(user, search.level, '😇', 'https://i.ibb.co/fHF35dY/tenor-5.gif'))
                break;
            case 700:
                // LEVEL 6
                // Unblock emoji
                search.level += 1
                channel.send(createEmbed(user, search.level, '😱', 'https://i.ibb.co/7vnrWHs/tenor-6.gif'))
                break;
            case 550:
                // LEVEL 7
                search.level += 1
                channel.send(createEmbed(user, search.level, '🥳', 'https://i.ibb.co/XCNdjcX/tenor-10.gif'))
                break;
            case 850:
                // LEVEL 8
                search.level += 1
                channel.send(createEmbed(user, search.level, '🥰', 'https://i.ibb.co/mRNk2Ct/tenor-7.gif'))
                break;
            case 1000:
                // LEVEL 9
                search.level += 1
                channel.send(createEmbed(user, search.level, '😈', 'https://i.ibb.co/ZHsbKTr/tenor-8.gif'))
                break;
            case 1250:
                // LEVEL 10
                // Role VIP
                search.level += 1
                channel.send(createEmbed(user, search.level, '🤩', 'https://i.ibb.co/JsjWgsK/tenor-9.gif'))
                break;
            default:
                break;
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