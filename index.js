const Discord = require('discord.js'),
    client = new Discord.Client({
        partials: ['MESSAGE', 'REACTION'],
        fetchAllMembers: true
    }),
    config = require('./config.json')
fs = require('fs')


client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')

fs.readdir('./commands', (err, parents) => {
    if (err) throw err
    parents.forEach(parent => {
        if (fs.lstatSync(`./commands/${parent}`).isDirectory()) {
            fs.readdir(`./commands/${parent}`, (err, child) => {
                if (err) throw err;
                child.forEach(file => {
                    if (!file.endsWith('.js')) return
                    const command = require(`./commands/${parent}/${file}`)
                    client.commands.set(command.name, command)
                })
            })
        } else {
            parent.forEach(file => {
                if (!file.endsWith('.js')) return
                const command = require(`./commands/${file}`)
                client.commands.set(command.name, command)
            })
        }
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})


client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setTitle('Bienvenue !')
        .setDescription(`${member} **Nous a rejoint ! N'hésite pas à prendre tes rôles dans** <#880112456737902632> **!**`)
        .setColor('#4f58b9')
    )
})


client.on('ready', () => {
    const statuses = [
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`

    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), { type: 'STREAMING', url: 'https://twitch.tv/arrdoxx' })
        i = ++i % statuses.length
    }, 1e4);
})


client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})

client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})