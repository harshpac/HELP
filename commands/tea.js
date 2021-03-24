const Discord = require('discord.js');
let embed = new Discord.MessageEmbed();
let frnd, me;

const hasTea = {};

module.exports = {
    name: 'tea',
    description: 'dfgd',
    execute(message, args, client, forme){
        if(forme) return message.channel.send(`You have ${hasTea[message.member.id]?hasTea[message.member.id]:0} cup of tea`);
        const {member, channel} = message;
        if(message.member.hasPermission('ADMINISTRATOR'))
        frnd = args[0].substr(3,args[0].length-4);
        else frnd = args[0].substr(2,args[0].length-3);
        me = member.id;
        if(me===frnd){
            return message.channel.send(embed.setDescription(`<@${me}> Ask someone for tea. You can't give tea to yourself `));
        }
        hasTea[frnd] = hasTea[frnd]?hasTea[frnd]+1:1;
        return message.channel.send(embed.setDescription(`<@${me}> provides a cup of tea 🍵 to <@${frnd}>\n <@${me}> cares for you <@${frnd}>`));
    }
}   