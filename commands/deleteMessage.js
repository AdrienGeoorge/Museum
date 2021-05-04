module.exports = {
    run: async (message, args) => {
        await message.delete()
        if (message.member.roles.cache.get('823665644989710416') || message.member.roles.cache.get('838813818904903730')) {
            !message.member.hasPermission('MANAGE_MESSAGES') && message.channel.send('<:refuse:823910204613722142> You don\'t have permission...').then((msg) => msg.delete({timeout: 3000}))
            if (args[0] !== undefined) {
                if (args[0] <= 100) {
                    await message.channel.bulkDelete(parseInt(args[0]))
                    message.channel.send(`<:valide:823910319092531201> At your service! I have deleted ${args[0]} message(s)!`).then((msg) => msg.delete({timeout: 3000}))
                } else {
                    message.channel.send('<:refuse:823910204613722142> I cannot delete more than 100 posts at a time and older than 14 days.').then((msg) => msg.delete({timeout: 3000}))
                }
            } else {
                message.channel.send('<:refuse:823910204613722142> You must specify a number of messages to delete!').then((msg) => msg.delete({timeout: 3000}))
            }
        } else {
            message.channel.send('<:refuse:823910204613722142> You don\'t have the rights to run this command.').then((msg) => msg.delete({timeout: 3000}))
        }
    },
    name: 'delete',
    guildOnly: true
}