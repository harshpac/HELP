
const mycmd = ['agenda', 'clear', 'link', 'setlink', 'stop', 'spam', 'listen', 'joke', 'change', 'help', 'allow', 'tea', 'google', 'clist'];
const Discord = require('discord.js');
let embed = new Discord.MessageEmbed();

function onematch(cmd, command) {
  if(cmd.length != command.length) return false;
  let cnt = 0;
  for(i=0; i<command.length; i++){
    if(cmd[i]!=command[i]) cnt++;
  }
  return cnt==1;
}



module.exports = {
    name: 'check',
    description: 'dfgd',
    execute(message, command, pre, flag){
        mycmd.forEach(cmd => {
            if(onematch(cmd, command)){
             return message.channel.send(embed.setDescription(`Did you mean **${pre}${cmd}** `).setColor('#00FF00'));
            }
            if(cmd===command && !flag){
              return message.channel.send(embed.setDescription("Use prefix  before command **without space**.\n To know current prefix use **`prefix`** ").setColor('#33FFC0'));
            }
        });
    }
}  
