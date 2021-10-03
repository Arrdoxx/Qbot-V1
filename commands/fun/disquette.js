const Discord = require('discord.js'),
    replies = ['Tout claquer pour claquer ton fiak', 'Tu serais pas une sortie de secours ? Car tu m\'EXIT', 'J\'aimerais que tu sois un médicament pour que je te prenne matin et soir !', 'La météo prévoyait pas d\'orage pourtant j\'ai eu un coup de foudre !', 'J\'ai plus d\'inspi car ya que toi dans mes pensés', 'Excuse moi tu serais pas l\'intro Netflix ? Car j\'ai trop envie de te sauter', 'J\'aimerais que tu sois un Doliprane 1000g pour te casser en deux...', 'Tu passes tellement de temps dans ma tête que je devrais te faire payer un loyer.', 'Si un monsieur bedonnant vient et te met dans un sac pendant la nuit, ne t’inquiète pas, j’ai dit au Père Noël que je te voulais sous mon sapin.', 'Est-ce que tu voudrais bien me prendre par le bras ? Comme ça, je pourrais dire à mes amis que j’ai été touchée par un ange.', 'Nous ne sommes pas des chaussettes …. Et pourtant je crois que nous ferions une belle paire !', 'Si un seul regard pouvait tuer, tu serais une arme de destruction massive.', 'Es-tu croyante ? Parce que tu es la réponse à toutes mes prières.', 'On dit que Disneyland est l’endroit le plus joyeux au monde. Apparemment, personne ne s’est jamais retrouvé à tes côtés.', 'Tu aimes les soldes ? Parce que si tu cherches une bonne affaire, mes vêtements sont actuellement soldés à 100%.', 'T\'es tellement belle que quand tu fais un excès de vitesse, le radar te fait un shooting photo.', 'Je m\'y connais pas en Soda mais tu fais pétiller mon cœur']

module.exports = {
    run: (message, args) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Disquette 💖`)
            .setColor('#4f58b9')
            .setDescription(replies[Math.floor(Math.random() * replies.length)]))
    },
    name: 'disquette'
}