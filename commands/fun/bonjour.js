const Discord = require('discord.js')

module.exports = {
    run: (message, args) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Bonjour`)
            .setColor('#4f58b9')
            .setDescription(`Bonjour à toi et bienvenue sur **${message.guild.name}** nous sommes: **${message.guild.memberCount} membres 😄**`))
    },
    name: 'bjr'
}