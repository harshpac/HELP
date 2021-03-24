const Discord = require('discord.js');

module.exports = {
    name: 'agenda',
    description: 'dfgd',
    execute(message, agenda){
        const embed = new Discord.MessageEmbed();
        if(!agenda) {
            embed
            .setDescription("Agenda not set. Use **`setagenda <...>`**")
            .setColor('#FF5233');
            return message.channel.send(embed);
        }
        agenda = agenda.join(" ");
        embed
        .setTitle("Today's agenda 🎯 ")
        .setDescription(`${agenda}`).setColor('#00FF00');
       message.channel.send(embed);
    }
}   