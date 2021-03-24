const Discord = require('discord.js');

module.exports = {
    name: 'toggle',
    description: 'dfgd',
    execute(message, args){
        const embed = new Discord.MessageEmbed();
        if(message.member.hasPermission("ADMINISTRATOR")){
        if(args.length > 1 || args.length==0){
            return message.channel.send(embed.setDescription("Invalid arguments ! Use `allow all` or `allow admin`").setColor('#CF2C19'))
        }
        if(args[0]==="admin"){
            return message.channel.send(embed.setDescription('🔒Only admin can delete messages').setColor('#33FFC0'))
        }
        else if(args[0]==="all"){
            return message.channel.send(embed.setDescription('🔓Group members can delete messages').setColor('#33FFC0'))
        }
    }
    else {
        return message.reply("  🚫  You don't have permissions");
    }
}
}  