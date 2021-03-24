const Discord = require('discord.js');

module.exports = {
    name: 'link',
    description: 'dfgd',
    execute(message, link){
        const embed = new Discord.MessageEmbed();
        if(!link) {
            embed
            .setDescription("Link not set. Use  **`setlink <...>`**")
            .setColor('#00FF00');
            return message.channel.send(embed);
        }
        embed
        .setColor('#00FF00')
        .setDescription(`${link}`);
        message.channel.send(embed);
    }
}  