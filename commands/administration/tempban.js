const Discord = require('discord.js')
const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')

module.exports = {
    run: async(message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à bannir.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Mettez une durée valide')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.ban({ reason })
        message.channel.send(`${member.user.tag} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})}`)
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(`${member.user.tag} n'est plus banni`)
        }, duration);
    },
    name: 'tempban',
    guildOnly: true
}






module.exports = {
    run: (message, args) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Bonjour`)
            .setColor('#4f58b9')
            .setDescription(`Bonjour à toi et bienvenue sur **${message.guild.name}** nous sommes: **${message.guild.memberCount} membres 😄**`))
    },
    name: 'bjr'
}





'Vous n\'avez pas la permission d\'utiliser cette commande.'