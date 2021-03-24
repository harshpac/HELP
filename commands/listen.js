const Discord = require('discord.js');

module.exports = {
    name: 'listen',
    description: "this is a ping command!",
    execute(message, args){
        if(args.length ==0 ) return;
        const embed = new Discord.MessageEmbed()
        .setTitle(`**${message.author.username}:**\n**${args.join(" ").toUpperCase()}**\n\n`).setColor('#00FF00');
        message.channel.send(embed);
    }
  }