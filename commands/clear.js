const Discord = require('discord.js');
let embed = new Discord.MessageEmbed();
const url = 'https://hotemoji.com/images/emoji/5/1r2ci3pv38k15.png'

module.exports = {
    name: 'clear',
    description: "this is a ping command!",
    execute(message, args, can){

        if(args.length > 1){
            return message.channel.send(embed.setDescription("Invalid Command"));
        }
        if(args[0]==="all"){
          if(message.member.hasPermission("ADMINISTRATOR") || can){
            message.channel.messages.fetch().then(res => {
              message.channel.bulkDelete(res, true)
              .then()
              .catch(err => {
                console.log(err);
                return message.channel.send(embed.setDescription('⚠️  Bot can delete messages that are under 14 days older').setColor('#6E6F51'));
              }) 
            })
          }
          else {
            message.reply(embed.setDescription("You don't have permissions"));
          }
        return
        }  
        if(isNaN(args[0])){
          return message.channel.send(embed.setDescription("Invalid Command"));
        }
        let num = parseInt(args[0]) + 1;
        //console.log(can)
        if(message.member.hasPermission("ADMINISTRATOR") || can){
       // console.log('yess');
        if(num<1){
          return message.reply(embed.setDescription(`You seem to be a bot, ${num-1} is invalid`).setColor('#CF2C19'));
        }
        if(num==1){
          return message.reply(embed.setDescription(`Are you a bot ? 0 message can not be deleted`).setColor('#CF2C19'));
        }
        if(num>=102){
          return message.channel.send(
            embed.setDescription('❌  Bot can delete upto 100 messages at a time !')
            .setColor('#CF2C19')
            );
        }
        message.channel.bulkDelete(num+1, true)
        .then(res => {
          if(num==2) return message.channel.send(embed.setDescription('🚮  Bot deleted 1 message ').setColor('#33E5FF'));
          else return message.channel.send(embed.setDescription(`🚮 Bot deleted ${num-1} messages `).setColor('#33E5FF'));
        })
        .catch(err => {
          return message.channel.send(embed.setDescription('⚠️  Bot can delete messages that are under 14 days older').setColor('#6E6F51'));
        });
        
       }
       else {
        return message.reply(` 🚫  You don't have permissions`);
       } 
    }
  }