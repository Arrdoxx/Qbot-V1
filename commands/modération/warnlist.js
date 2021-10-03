const moment = require('moment'),
    Discord = require('discord.js')

moment.locale('fr')

module.exports = {
        run: async(message, args, client) => {
                if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
                const member = message.mentions.members.first()
                if (!member) return message.channel.send('Veuillez mentionner le membre dont voir les warns.')
                if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
                message.channel.send(new Discord.MessageEmbed()
                        .setDescription(`**Nombre de Warn actuel :** ${client.db.warns[member.id].length}\n\n__**Voici la liste de warn de ${member}**__\n\n${client.db.warns[member.id].slice(0, 100).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`).setColor('RANDOM'))
                        .setColor('#4f58b9')
    },
    name: 'warnlist',
    guildOnly: true
}